'use client';

import { type ReactNode, useCallback, type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardEffectsProps {
  children: ReactNode;
  variant?: 'default' | 'featured';
  className?: string;
  /** Stagger delay in seconds for Framer Motion entry animation */
  delay?: number;
}

export function CardEffects({ children, variant = 'default', className = '', delay = 0 }: CardEffectsProps) {
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
      className={cn('group relative h-full', className)}
    >
      <div className={cn(
        'relative h-full overflow-hidden transition-all duration-500 rounded-xl',
        'backdrop-blur-[1px] hover:backdrop-blur-[2px]',
        'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]',
        'group-hover:shadow-[0_8px_30px_-4px_rgba(124,58,237,0.1)] dark:group-hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5)]',
        'border border-zinc-200/50 dark:border-white/[0.05]',
        'group-hover:border-purple-300/50 dark:group-hover:border-purple-500/20',
        variant === 'featured'
          ? 'bg-gradient-to-br from-white via-purple-50/40 to-cyan-50/30 dark:from-zinc-900/60 dark:via-purple-900/30 dark:to-blue-900/40 ring-1 ring-purple-300/40 dark:ring-purple-500/10'
          : 'bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100/30 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-800/50',
      )}>
        <div className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-cyan-200/15 to-pink-200/20 dark:from-purple-500/[0.05] dark:via-cyan-500/[0.05] dark:to-pink-500/[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-tl from-green-200/15 via-blue-200/15 to-purple-200/20 dark:from-green-500/[0.03] dark:via-blue-500/[0.04] dark:to-purple-500/[0.05]" />
        </div>
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(124,58,237,0.08),
              transparent 80%
            )`,
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(124,58,237,0.1),
              transparent 80%
            )`,
          }}
        />

        <div className="relative h-full z-10 bg-white/60 dark:bg-black/10 backdrop-blur-[2px] group-hover:bg-purple-50/30 dark:group-hover:bg-black/20 transition-colors duration-500">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export const cardBaseClasses = {
  contentWrapper: 'relative flex flex-col gap-4 p-6',
};
