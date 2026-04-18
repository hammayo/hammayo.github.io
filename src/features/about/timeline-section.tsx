// src/features/about/timeline-section.tsx
import type { CareerEntry } from '../../../content/about';

interface TimelineSectionProps {
  timeline: CareerEntry[];
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Career</h2>
      <div className="relative">
        {/* Vertical rule */}
        <div className="absolute left-[6px] top-2 bottom-2 w-px bg-[var(--scheme-border)]" aria-hidden="true" />

        <ul className="space-y-6 pl-6">
          {timeline.map((entry) => (
            <li key={`${entry.company}-${entry.period}`} className="relative">
              {/* Timeline dot */}
              <div
                className="absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-[var(--scheme-border)] bg-background"
                aria-hidden="true"
              />
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-semibold text-foreground">{entry.company}</span>
                  <span className="text-xs text-muted-foreground">{entry.period}</span>
                </div>
                <p className="text-xs text-[var(--scheme-accent)] font-medium">{entry.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{entry.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
