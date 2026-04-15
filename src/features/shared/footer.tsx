import { SITE, SOCIAL, SITE_LAUNCH_YEAR } from '@/lib/constants';
import { Button } from '@/features/shared/ui/button';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { CopyrightYear } from './copyright-year';
import { Container } from './container';
import { GithubIcon, LinkedinIcon } from './icons';

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn(
      'w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      className
    )}>
      <Container className="flex items-center justify-between gap-4 py-2">
        <div className="flex items-center">
          <p className="text-xs text-muted-foreground">
            Built by{' '}
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {SITE.author}
            </a>
            {' '}&copy; <CopyrightYear launchYear={SITE_LAUNCH_YEAR} />
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={`mailto:${SOCIAL.email}`}>
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
          <div className="ml-2 border-l border-border/40 pl-4">
            <ThemeToggle aria-label="Toggle color theme" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
