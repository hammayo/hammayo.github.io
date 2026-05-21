#!/usr/bin/env node
/**
 * generate.mjs — Generate a full MDX blog post draft for hammayo.co.uk
 *                + Twitter/X and LinkedIn social posts saved as _social.md
 *
 * Usage:
 *   node scripts/blog-automation/generate.mjs --topic <1-4> [--context "extra notes"] [--date YYYY-MM-DD]
 *
 * Requires: ANTHROPIC_API_KEY in environment
 * Run research.mjs first to generate .last-briefing.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '../../');
const PERSONA_PATH = join(__dirname, 'persona.md');
const LOG_PATH = join(__dirname, 'topics-log.json');
const BRIEFING_PATH = join(__dirname, '.last-briefing.json');

const SITE_URL = 'https://hammayo.co.uk';

// --- Validate environment ---
const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY is not set. Add it to your shell profile and retry.');
  process.exit(1);
}

// --- Parse CLI args ---
const args = process.argv.slice(2);

function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

const topicIndexRaw = getArg('--topic');
const topicIndex = topicIndexRaw !== null ? parseInt(topicIndexRaw, 10) - 1 : 0;
const extraContext = getArg('--context') ?? '';
const dateArg = getArg('--date') ?? new Date().toISOString().split('T')[0];

// --- Validate date format ---
if (!/^\d{4}-\d{2}-\d{2}$/.test(dateArg)) {
  console.error(`❌ Invalid date format "${dateArg}". Use YYYY-MM-DD.`);
  process.exit(1);
}

const persona = readFileSync(PERSONA_PATH, 'utf8');

if (!existsSync(BRIEFING_PATH)) {
  console.error('❌ No briefing found. Run research.mjs first.');
  process.exit(1);
}

let briefing;
try {
  briefing = JSON.parse(readFileSync(BRIEFING_PATH, 'utf8'));
} catch {
  console.error('❌ Could not parse .last-briefing.json. Run research.mjs again.');
  process.exit(1);
}

const topic = briefing.topics[topicIndex];
if (!topic) {
  console.error(`❌ Topic ${topicIndex + 1} not found. Briefing has ${briefing.topics.length} topic(s).`);
  process.exit(1);
}

// Sanitise slug — only lowercase letters, numbers, hyphens
const rawSlug = topic.slug_suggestion ?? topic.title;
const slug = rawSlug
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const folderName = `${dateArg}-${slug}`;
const postUrl = `${SITE_URL}/blogs/${slug}/`;

console.log(`\n✍️  Generating post: "${topic.title}"`);
console.log(`   Slug: ${slug}`);
console.log(`   Date: ${dateArg}`);
console.log(`   URL:  ${postUrl}\n`);

// ---------------------------------------------------------------------------
// Shared API helper
// ---------------------------------------------------------------------------
async function callClaude({ system, userPrompt, maxTokens = 2500 }) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('');
}

// ---------------------------------------------------------------------------
// Step 1: Generate MDX blog post
// ---------------------------------------------------------------------------
const blogSystemPrompt = `You are a ghostwriter for Hammy Babar's personal engineering blog at hammayo.co.uk.
Write exactly as Hammy would. Here is his full persona:

${persona}

CRITICAL RULES:
- First person throughout. This is Hammy writing, not about Hammy.
- Opinionated. Have a clear take. Don't sit on the fence.
- Reference real-world experience where plausible (MoJ, HMPPS, fuel forecourt payments, .NET, Docker, CI/CD).
- No fluff intros. Start with something direct or a question.
- No "In conclusion" or "In summary" endings. End with a forward-looking thought or a challenge to the reader.
- No listicle style — write in prose with maybe one or two structured code blocks if needed.
- British spelling (favour, behaviour, colour).
- Length: 800-1100 words.`;

const tagList = topic.tags.map(t => `"${t}"`).join(', ');

const blogUserPrompt = `Write a blog post on this topic:

Title: ${topic.title}
Suggested angle: ${topic.hammayo_angle}
Why trending now: ${topic.why_trending}
Tags: ${topic.tags.join(', ')}
${extraContext ? `\nExtra context from Hammy: ${extraContext}` : ''}

Return ONLY valid MDX frontmatter + content. No preamble. No explanation. Start with ---

Frontmatter format:
---
title: "..."
date: "${dateArg}"
summary: "One sentence for the card. Make it hook the reader."
tags: [${tagList}]
published: false
---`;

// ---------------------------------------------------------------------------
// Step 2: Generate social posts
// ---------------------------------------------------------------------------
const socialSystemPrompt = `You write social media posts for Hammy Babar, a UK backend engineer (20+ yrs, .NET, Docker, CI/CD, AI tooling).
His tone: direct, opinionated, no hype, slightly dry British humour. First person. No em dashes.
He does not use hollow phrases like "excited to share" or "thrilled to announce".`;

function buildSocialUserPrompt(postTitle, postSummary) {
  return `Write two social media posts promoting this blog post:

Title: ${postTitle}
Summary: ${postSummary}
URL: ${postUrl}

Return EXACTLY this JSON (no markdown, no preamble):
{
  "twitter": "The tweet text here. Max 240 chars (leave room for the URL). Hook first. No hashtags unless genuinely useful — max 2 if used. End without the URL (it will be appended separately).",
  "linkedin": "The LinkedIn post here. 3-5 short paragraphs. Hook first line. Expand on the angle with 1-2 sentences of real opinion. End with a question or challenge to the reader. Include the URL on its own line near the end. 150-250 words total."
}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function generatePost() {
  // --- Blog post ---
  console.log('📝 Generating blog draft...');
  let mdxContent;
  try {
    mdxContent = await callClaude({
      system: blogSystemPrompt,
      userPrompt: blogUserPrompt,
      maxTokens: 2500,
    });
  } catch (err) {
    console.error('❌ Network error calling Anthropic API:', err.message);
    process.exit(1);
  }

  if (!mdxContent.startsWith('---')) {
    console.error('❌ Claude returned unexpected content (missing frontmatter). Raw output:\n');
    console.error(mdxContent.slice(0, 500));
    process.exit(1);
  }

  // Extract summary from frontmatter for use in social prompt
  const summaryMatch = mdxContent.match(/^summary:\s*"(.+?)"/m);
  const postSummary = summaryMatch ? summaryMatch[1] : topic.hammayo_angle;

  // Extract actual title from frontmatter (Claude may have refined it)
  const titleMatch = mdxContent.match(/^title:\s*"(.+?)"/m);
  const postTitle = titleMatch ? titleMatch[1] : topic.title;

  // Create blog folder + MDX file
  const folderPath = join(REPO_ROOT, 'content/blogs', folderName);
  const filePath = join(folderPath, 'index.mdx');
  mkdirSync(folderPath, { recursive: true });
  writeFileSync(filePath, mdxContent);
  console.log(`✅ Blog draft:   content/blogs/${folderName}/index.mdx`);

  // --- Social posts ---
  console.log('📣 Generating social posts...');
  let socialContent;
  try {
    socialContent = await callClaude({
      system: socialSystemPrompt,
      userPrompt: buildSocialUserPrompt(postTitle, postSummary),
      maxTokens: 800,
    });
  } catch (err) {
    console.error('⚠️  Social post generation failed:', err.message);
    console.error('   Blog draft was saved. You can generate social posts manually.');
    socialContent = null;
  }

  if (socialContent) {
    let social;
    try {
      const clean = socialContent.replace(/```json|```/g, '').trim();
      social = JSON.parse(clean);
    } catch {
      console.error('⚠️  Could not parse social post JSON. Raw output saved to _social.md anyway.');
      social = { twitter: socialContent, linkedin: '' };
    }

    const tweetWithUrl = `${social.twitter}\n\n${postUrl}`;
    const tweetCharCount = tweetWithUrl.replace(/\n/g, ' ').length;

    const socialMd = `# Social Posts — ${postTitle}

> Auto-generated. Review and edit before posting.
> Blog URL: ${postUrl}

---

## Twitter / X

\`\`\`
${tweetWithUrl}
\`\`\`

**Character count:** ${tweetCharCount} / 280

---

## LinkedIn

${social.linkedin}
`;

    const socialPath = join(folderPath, '_social.md');
    writeFileSync(socialPath, socialMd);
    console.log(`✅ Social posts: content/blogs/${folderName}/_social.md`);

    // Print Twitter post to terminal for quick copy
    console.log('\n' + '─'.repeat(60));
    console.log('🐦 Twitter/X preview:');
    console.log('─'.repeat(60));
    console.log(tweetWithUrl);
    console.log(`   (${tweetCharCount} chars)`);
    console.log('─'.repeat(60) + '\n');
  }

  // Update topics log
  const topicsLog = existsSync(LOG_PATH)
    ? JSON.parse(readFileSync(LOG_PATH, 'utf8'))
    : { written: [] };

  topicsLog.written.push({
    title: postTitle,
    slug: folderName,
    date: dateArg,
    tags: topic.tags,
  });

  writeFileSync(LOG_PATH, JSON.stringify(topicsLog, null, 2));

  console.log('Next steps:');
  console.log(`  1. Open in Rider:  ${filePath}`);
  console.log(`  2. Review + edit blog (set published: true when ready)`);
  console.log(`  3. Review _social.md — edit tweets/LinkedIn before posting`);
  console.log(`  4. git checkout -b content/${slug}`);
  console.log(`  5. git add content/blogs/${folderName}/`);
  console.log(`  6. git commit -m "content: add post — ${postTitle}"`);
  console.log(`  7. git push → PR to develop → merge to main → auto-deploys ✓`);
  console.log(`\n  Once live → post Twitter/X then LinkedIn linking to ${postUrl}\n`);
}

generatePost();
