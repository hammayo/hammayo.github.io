Research trending dev topics this week and produce a briefing for a new hammayo.co.uk blog post.

## Steps

1. **Remove any existing briefing** — if `scripts/blog-automation/.last-briefing.json` exists, delete it before proceeding.

2. **Read the persona file** at `scripts/blog-automation/persona.md` — this defines Hammy's voice, domains, and what to avoid.

3. **Read the topics log** at `scripts/blog-automation/topics-log.json` — extract the last 10 `title` + `date` entries to avoid repeating recent posts.

4. **Web search** for what is genuinely trending in software engineering this week. Focus searches on:
   - .NET / C# ecosystem news
   - Docker, CI/CD tooling updates
   - AI developer tooling (Claude, MCP, agentic workflows)
   - DevOps / backend engineering topics
   - Regulated tech / compliance engineering

   Run at least 3 targeted searches. Prioritise news from the past 7 days.

5. **Filter and rank** to 4 topics that best match Hammy's persona domains. Discard anything frontend-heavy, pure cloud theory, Kubernetes hype, or listicle-style topics.

6. **Present the briefing** in this format for each topic:

   ```
   N. [Title]
      Tags: tag1, tag2
      Why now: [2 sentences on what happened this week to make this timely]
      Your angle: [1-2 sentences — the specific opinionated take grounded in Hammy's experience]
      Est. read: X min
      Source: [url]
   ```

7. **Save the briefing** as JSON to `scripts/blog-automation/.last-briefing.json` in this exact shape:
   ```json
   {
     "briefing_date": "YYYY-MM-DD",
     "topics": [
       {
         "title": "...",
         "slug_suggestion": "kebab-case-slug",
         "tags": ["tag1", "tag2"],
         "why_trending": "...",
         "hammayo_angle": "...",
         "estimated_read_time": "X min",
         "sources": ["url"]
       }
     ]
   }
   ```

8. **Prompt the user** to pick a topic number, then tell them to run:
   ```
   /blog-generate --topic N
   ```
   Or with extra context:
   ```
   /blog-generate --topic N --context "I dealt with this at MoJ last year"
   ```
