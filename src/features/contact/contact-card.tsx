'use client';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { schemeHoverBorder } from '@/design/variants';
import { SchemeGlowOverlay } from '@/features/shared/ui/scheme-glow-overlay';

interface ContactCardProps {
  icon:       IconDefinition;
  iconColor?: string;
  label:      string;
  handle:     string;
  link:       string;
  linkText?:  string;
  delay?:     number;
}

export function ContactCard({ icon, iconColor, label, handle, link, delay = 0 }: ContactCardProps) {
  const isExternal = !link.startsWith('mailto:');

  return (
    <motion.a
      href={link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn('group relative flex flex-col items-center gap-3 px-4 py-5 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm transition-all duration-300 no-underline', schemeHoverBorder)}
    >
      <SchemeGlowOverlay origin="top" />

      {/* Icon */}
      <div
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ background: iconColor ? `${iconColor}18` : 'var(--scheme-accent)/10' }}
      >
        <FontAwesomeIcon
          icon={icon}
          className="w-7 h-7 transition-transform duration-300"
          style={{ color: iconColor ?? 'var(--scheme-accent-text)' }}
        />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col items-center gap-0.5 min-w-0 w-full">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 group-hover:text-[var(--scheme-accent-text)] transition-colors duration-300 leading-none">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300 truncate w-full text-center">
          {handle}
        </span>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-500 rounded-full gradient-bg opacity-60" />
    </motion.a>
  );
}
