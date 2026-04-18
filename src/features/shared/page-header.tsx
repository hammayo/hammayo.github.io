import type { ReactNode } from 'react';
import { gradientText } from '@/design/variants';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      <div className="h-0.5 w-10 rounded-full gradient-bg mb-3" />
      <h1 className={gradientText({ size: 'heading' })}>{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
