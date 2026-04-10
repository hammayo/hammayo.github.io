import { cva } from 'class-variance-authority';

/**
 * Gradient text variant.
 * Uses CSS custom properties set by SchemeProvider.
 * Apply className from this + `gradient-text` utility class.
 */
export const gradientText = cva('gradient-text bg-clip-text text-transparent', {
  variants: {
    size: {
      display: 'text-4xl md:text-8xl font-bold',
      heading: 'text-2xl md:text-4xl font-bold',
      body:    'text-base font-medium',
    },
  },
  defaultVariants: {
    size: 'body',
  },
});

/**
 * Glow card variant.
 * Uses scheme-glow and scheme-border utilities.
 */
export const glowCard = cva(
  'rounded-2xl border scheme-border scheme-glow transition-all duration-300',
  {
    variants: {
      variant: {
        featured: 'bg-primary/5 hover:bg-primary/8',
        default:  'bg-background/50 hover:bg-background/70',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Accent tag variant.
 * Pill-shaped tag using scheme accent colour.
 */
export const accentTag = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
  {
    variants: {
      variant: {
        scheme: 'scheme-border text-[var(--scheme-accent)] bg-[var(--scheme-accent)]/10',
        muted:  'border-border text-muted-foreground bg-muted/50',
      },
    },
    defaultVariants: {
      variant: 'scheme',
    },
  }
);
