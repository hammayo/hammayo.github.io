'use client';

import { type ReactNode } from 'react';
import { CardEffects } from '@/features/shared/ui/card-effects';
import { ctaButton } from '@/design/variants';
import { cn } from '@/lib/utils';

interface ContactCardProps {
  icon:     ReactNode;
  title:    string;
  subtitle: string;
  link:     string;
  linkText: string;
}

export function ContactCard({ icon, title, subtitle, link, linkText }: ContactCardProps) {
  const isExternal = !link.startsWith('mailto:');

  return (
    <CardEffects>
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="w-16 h-16 flex items-center justify-center border rounded-full dark:bg-black/30 bg-white/30 backdrop-blur-md transition-all duration-300 scheme-border group-hover:scheme-glow">
          {icon}
        </div>
        <div className="flex flex-col items-center mt-2">
          <h3 className="gradient-text text-xl font-medium tracking-tight transition-all duration-300 opacity-80 group-hover:opacity-100">
            {title}
          </h3>
          <span className="mt-4 text-sm text-center text-zinc-600 dark:text-zinc-400 group-hover:text-[var(--scheme-accent)] transition-colors">
            {subtitle}
          </span>
        </div>
        <a
          href={link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={cn(ctaButton({ variant: 'gradient' }), 'mt-6')}
        >
          {linkText}
        </a>
      </div>
    </CardEffects>
  );
}
