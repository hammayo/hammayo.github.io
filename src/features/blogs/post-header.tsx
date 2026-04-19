import Image from 'next/image';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { format } from 'date-fns';
import { accentTag } from '@/design/variants';
import { cn } from '@/lib/utils';
import { HeroFallbackBackground } from './hero-fallback-background';
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

  // With a real hero image: dark overlay ensures white text is readable on any photo.
  // A subtle scheme tint bleeds in at the top so the header still feels scheme-aware.
  if (heroPath) {
    return (
      <div className="relative w-full mb-8 rounded-2xl overflow-hidden min-h-[240px] md:min-h-[320px]">
        <Image src={heroPath} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-[var(--scheme-accent)]/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3">{post.title}</h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.map(tag => (
                <span key={tag} className={cn(accentTag(), 'bg-black/40 backdrop-blur-sm')}>{tag}</span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3 text-sm text-white/70">
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </div>
    );
  }

  // No hero image: scheme-aware fallback — gradient title, accent bar, scheme border.
  // flex + justify-end keeps content anchored to the bottom without a large empty gap at top.
  return (
    <div className="relative w-full mb-8 rounded-2xl overflow-hidden min-h-[180px] md:min-h-[220px] border border-[var(--scheme-border)] flex flex-col justify-end">
      <HeroFallbackBackground />
      <div className="relative z-10 p-6 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold gradient-text leading-tight mb-2">{post.title}</h1>
        <div className="h-0.5 w-10 rounded-full gradient-bg scheme-glow mb-3" />
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className={accentTag()}>{tag}</span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </div>
  );
}
