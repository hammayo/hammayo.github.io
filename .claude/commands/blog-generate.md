Generate a full blog post draft + social posts for hammayo.co.uk from the last research briefing.

Arguments: $ARGUMENTS
Expected format: --topic <1-4> [--context "extra notes"] [--date YYYY-MM-DD] [--redo-social <slug>]

## Steps

### 1. Parse arguments
- `--topic N` — which topic from the last briefing (1-indexed). Default: 1.
- `--context "..."` — optional extra context from Hammy (real experience to weave in).
- `--date YYYY-MM-DD` — post date. Default: today's date.
- `--redo-social <slug>` — regenerate only the social posts for an existing post. Slug is the folder name under `content/blogs/` (with or without the date prefix). If this flag is present, skip steps 2–4 and 6 and jump straight to the social post generation step.

### 1a. Redo-social shortcut (only when `--redo-social` is provided)

- Find the matching folder under `content/blogs/` — accept the full folder name (e.g. `2026-05-25-my-post`) or just the slug portion (`my-post`); glob if needed.
- Read the existing `index.mdx` to extract the title, tags, date, and full post content.
- Derive `slug` (strip the date prefix), `date`, and blog URL: `https://hammayo.co.uk/blogs/{slug}/`
- Go directly to **step 5** to rewrite `_social.md`, then go to **step 7** (skip steps 2, 3, 4, 6).
- In step 7 confirmation, note that only social posts were regenerated.

### 2. Load inputs
- Read persona from `scripts/blog-automation/persona.md`
- Read last briefing from `scripts/blog-automation/.last-briefing.json`
- If the briefing file doesn't exist, tell the user to run `/blog-research` first and stop.
- Select the topic at index N-1 from the `topics` array.

### 3. Derive the slug and URL
- Take `slug_suggestion` from the topic (or slugify the title if missing).
- Sanitise: lowercase, only `a-z`, `0-9`, `-`. No consecutive hyphens.
- Post folder: `content/blogs/{date}-{slug}/`
- Blog URL: `https://hammayo.co.uk/blogs/{slug}/`

### 4. Write the blog post — `content/blogs/{date}-{slug}/index.mdx`

Write a full MDX post as Hammy Babar. Adhere strictly to his persona:

**Voice rules:**
- First person throughout — Hammy is writing, not being written about
- Opinionated — have a clear take, don't sit on the fence
- Reference real experience where plausible: MoJ, HMPPS, fuel forecourt payments, .NET, Docker, CI/CD
- No fluff intros — start with something direct or a question
- No "In conclusion" / "In summary" endings — end with a forward-looking thought or challenge to the reader
- No listicle style — prose, with one or two code blocks only if genuinely needed
- British spelling: favour, behaviour, colour
- Length: 800–1100 words

**Frontmatter format** (start the file with exactly this structure):
```
---
title: "..."
date: "YYYY-MM-DD"
summary: "One sentence. Hook the reader."
tags: ["tag1", "tag2"]
published: false
---
```

### 5. Write the social posts — `content/blogs/{date}-{slug}/_social.md`

Generate two posts in Hammy's voice (direct, no hype, dry British humour, no "excited to share"):

**Twitter/X:**
- Max 240 chars (URL will be appended separately — add it on a new line after the tweet text)
- Hook first line
- Max 2 hashtags, only if genuinely useful
- Append the blog URL on its own line at the end
- Show character count

**LinkedIn:**
- 3–5 short paragraphs
- Hook on the first line
- Expand with 1–2 sentences of real opinion
- Include the blog URL on its own line near the end
- End with a question or challenge to the reader
- 150–250 words total

Save `_social.md` with clear section headers for Twitter/X and LinkedIn, and a character count for the tweet.

### 6. Update the topics log — `scripts/blog-automation/topics-log.json`

Append to the `written` array:
```json
{
  "title": "...",
  "slug": "{date}-{slug}",
  "date": "YYYY-MM-DD",
  "tags": ["tag1", "tag2"]
}
```

### 7. Confirm and show next steps

Print confirmation of both files created, then:

```
Next steps:
  1. Open in Rider: content/blogs/{date}-{slug}/index.mdx
  2. Review + edit blog (set published: true when ready)
  3. Review _social.md — edit before posting
  4. git checkout -b content/{slug}
  5. git add content/blogs/{date}-{slug}/
  6. git commit -m "content: add post — {title}"
  7. git push → PR → merge to main → auto-deploys ✓

  Once live → post Twitter/X then LinkedIn pointing to:
  https://hammayo.co.uk/blogs/{slug}/
```
