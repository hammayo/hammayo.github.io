// scripts/copy-blog-assets.mjs
import { readdirSync, existsSync, mkdirSync, cpSync } from 'fs';
import { join } from 'path';

const BLOGS_DIR = join(process.cwd(), 'content', 'blogs');
const OUT_DIR   = join(process.cwd(), 'public', 'blog-assets');

if (!existsSync(BLOGS_DIR)) {
  console.log('[copy-blog-assets] No content/blogs directory found — skipping.');
  process.exit(0);
}

const dirs = readdirSync(BLOGS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let copied = 0;
for (const dir of dirs) {
  const assetsDir = join(BLOGS_DIR, dir, 'assets');
  if (!existsSync(assetsDir)) continue;

  // Slug is folder name minus the date prefix YYYY-MM-DD-
  const slug = dir.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const destDir = join(OUT_DIR, slug);

  mkdirSync(destDir, { recursive: true });
  cpSync(assetsDir, destDir, { recursive: true });
  console.log(`[copy-blog-assets] ${dir}/assets → public/blog-assets/${slug}/`);
  copied++;
}

console.log(`[copy-blog-assets] Done. Copied assets for ${copied} post(s).`);
