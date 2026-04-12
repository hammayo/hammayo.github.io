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

/**
 * CTA button variant.
 * Primary uses the scheme gradient background.
 * Ghost uses a transparent background with border.
 */
export const ctaButton = cva(
  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        gradient: 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 hover:shadow-violet-500/40 hover:scale-[1.03] active:scale-[0.97] focus-visible:ring-violet-500',
        ghost:    'border-2 border-foreground/40 text-foreground font-semibold hover:border-violet-400 hover:text-violet-400 hover:bg-violet-500/10 hover:scale-[1.03] active:scale-[0.97] focus-visible:ring-border',
      },
    },
    defaultVariants: {
      variant: 'gradient',
    },
  }
);
