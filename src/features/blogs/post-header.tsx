import Image from 'next/image';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { format } from 'date-fns';
import { accentTag } from '@/design/variants';
import type { PostMeta } from './schema';

interface PostHeaderProps {
  post: PostMeta;
}

const HERO_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];

/** Checks if the post has a hero image in its assets folder (server-side only) */
function getHeroPath(slug: string): string | null {
  const blogsDir = join(process.cwd(), 'content', 'blogs');
  try {
    const folders = readdirSync(blogsDir) as string[];
    const folder  = folders.find((f: string) => f.endsWith(`-${slug}`) || f === slug);
    if (!folder) return null;
    for (const ext of HERO_EXTENSIONS) {
      const candidate = join(blogsDir, folder, 'assets', `hero.${ext}`);
      if (existsSync(candidate)) {
        return `/blog-assets/${slug}/hero.${ext}`;
      }
    }
  } catch { /* ignore */ }
  return null;
}

export function PostHeader({ post }: PostHeaderProps) {
  const heroPath = getHeroPath(post.slug);

  return (
    <div className="relative w-full mb-8 rounded-2xl overflow-hidden min-h-[240px] md:min-h-[320px]">
      {heroPath ? (
        <Image
          src={heroPath}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 gradient-bg" />
      )}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content overlaid at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className={accentTag() + ' bg-black/40 backdrop-blur-sm'}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </div>
  );
}
