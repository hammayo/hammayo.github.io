'use client';

import { type ReactNode, useCallback, type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardBgBase, cardBgOverlay1, cardBgOverlay2 } from './card-background-classes';

interface CardEffectsProps {
  children: ReactNode;
  variant?: 'default' | 'featured';
  className?: string;
  /** Stagger delay in seconds for Framer Motion entry animation */
  delay?: number;
  /** Always show scheme-coloured border (not just on hover) */
  bordered?: boolean;
}

export function CardEffects({ children, variant = 'default', className = '', delay = 0, bordered = false }: CardEffectsProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    ({ clientX, clientY, currentTarget }: MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      className={cn('group relative h-full gradient-border-hover', className)}
    >
      <div className={cn(
        'relative h-full overflow-hidden transition-all duration-500 rounded-xl',
        'backdrop-blur-[1px] hover:backdrop-blur-[2px]',
        'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]',
        'group-hover:shadow-[0_8px_30px_-4px_var(--scheme-glow)] dark:group-hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5)]',
        bordered ? 'border scheme-border' : 'border border-zinc-200/50 dark:border-white/[0.05]',
        !bordered && 'group-hover:border-[var(--scheme-border)]',
        variant === 'featured'
          ? 'bg-gradient-to-br from-white via-zinc-50/40 to-sky-50/20 dark:from-zinc-900/60 dark:via-zinc-900/30 dark:to-zinc-800/30 ring-1 ring-[var(--scheme-border)]'
          : cardBgBase,
      )}>
        <div className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100">
          <div className={`absolute inset-0 ${cardBgOverlay1}`} />
          <div className={`absolute inset-0 ${cardBgOverlay2}`} />
        </div>
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              var(--scheme-glow),
              transparent 80%
            )`,
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              var(--scheme-glow),
              transparent 80%
            )`,
          }}
        />

        <div className="relative h-full z-10 bg-white/60 dark:bg-black/10 backdrop-blur-[2px] group-hover:bg-[var(--scheme-accent)]/5 transition-colors duration-500">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export const cardBaseClasses = {
  contentWrapper: 'relative flex flex-col gap-4 p-6',
};
