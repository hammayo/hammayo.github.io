#!/usr/bin/env node
/**
 * research.mjs — Weekly trending topic briefing for hammayo.co.uk
 * Run every Thursday 20:00 via Claude Cowork scheduled task.
 *
 * Requires: ANTHROPIC_API_KEY in environment
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PERSONA_PATH = join(__dirname, 'persona.md');
const LOG_PATH = join(__dirname, 'topics-log.json');
const BRIEFING_PATH = join(__dirname, '.last-briefing.json');

// --- Validate environment ---
const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY is not set. Add it to your shell profile and retry.');
  process.exit(1);
}

const persona = readFileSync(PERSONA_PATH, 'utf8');
const topicsLog = existsSync(LOG_PATH)
  ? JSON.parse(readFileSync(LOG_PATH, 'utf8'))
  : { written: [] };

const recentTopics = topicsLog.written
  .slice(-10)
  .map(t => `- ${t.title} (${t.date})`)
  .join('\n');

const today = new Date().toISOString().split('T')[0];

const systemPrompt = `You are a research assistant for a personal engineering blog.
The blog author is Hammy Babar. Here is his persona and domain focus:

${persona}

Your job: identify trending, genuinely interesting dev topics from THIS WEEK that
Hammy could write about authentically. Prioritise topics he has real experience with.
Avoid topics he has recently covered.`;

const userPrompt = `Today is ${today}. Search for what's trending in software engineering this week.

Recent posts to avoid repeating:
${recentTopics || 'None yet'}

Return EXACTLY this JSON structure (no markdown, no preamble):
{
  "briefing_date": "${today}",
  "topics": [
    {
      "title": "Short topic title",
      "slug_suggestion": "kebab-case-slug",
      "tags": ["tag1", "tag2"],
      "why_trending": "2 sentences on what happened this week to make this timely",
      "hammayo_angle": "1-2 sentences on the specific opinionated angle Hammy could take, grounded in his experience",
      "estimated_read_time": "X min",
      "sources": ["url1", "url2"]
    }
  ]
}

Return 4 topics. Rank by best fit for Hammy's persona.`;

async function runResearch() {
  console.log('\n🔍 Fetching this week\'s trending dev topics for hammayo.co.uk...\n');

  let data;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'web-search-2025-03-05',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2000,
        system: systemPrompt,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`❌ API error ${response.status}: ${err}`);
      process.exit(1);
    }

    data = await response.json();
  } catch (err) {
    console.error('❌ Network error calling Anthropic API:', err.message);
    process.exit(1);
  }

  // Extract text blocks only (ignore tool_use / tool_result blocks)
  const fullText = data.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('');

  let briefing;
  try {
    const clean = fullText.replace(/```json|```/g, '').trim();
    briefing = JSON.parse(clean);
  } catch {
    console.error('❌ Could not parse JSON from Claude response. Raw output:\n');
    console.error(fullText);
    process.exit(1);
  }

  if (!briefing.topics || !Array.isArray(briefing.topics)) {
    console.error('❌ Unexpected response shape — no topics array. Raw output:\n');
    console.error(JSON.stringify(briefing, null, 2));
    process.exit(1);
  }

  console.log(`📅 Topic Briefing — ${briefing.briefing_date}`);
  console.log('═'.repeat(60));

  briefing.topics.forEach((t, i) => {
    console.log(`\n${i + 1}. ${t.title}`);
    console.log(`   Tags: ${t.tags.join(', ')}`);
    console.log(`   Why now: ${t.why_trending}`);
    console.log(`   Your angle: ${t.hammayo_angle}`);
    console.log(`   Est. read time: ${t.estimated_read_time}`);
    if (t.sources?.length) {
      console.log(`   Sources: ${t.sources[0]}`);
    }
  });

  console.log('\n' + '═'.repeat(60));
  console.log('\n✅ Pick a topic number and run:');
  console.log(`   node scripts/blog-automation/generate.mjs --topic <number> --date ${today}`);
  console.log('\n   Or pass extra context:');
  console.log('   node scripts/blog-automation/generate.mjs --topic 2 --context "I hit this at MoJ last year"\n');

  // Save briefing for generate.mjs to reference
  writeFileSync(BRIEFING_PATH, JSON.stringify(briefing, null, 2));
  console.log(`💾 Briefing saved to scripts/blog-automation/.last-briefing.json\n`);
}

runResearch();
