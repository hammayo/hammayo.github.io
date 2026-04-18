// src/features/contact/availability-banner.tsx
import { accentTag } from '@/design/variants';
import type { contact } from '../../../content/contact';

interface AvailabilityBannerProps {
  availability: typeof contact['availability'];
}

export function AvailabilityBanner({ availability }: AvailabilityBannerProps) {
  return (
    <div className="w-full rounded-xl border scheme-border bg-[var(--scheme-accent)]/5 p-5 space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Currently open to</p>
        <p className="text-sm font-medium text-foreground">{availability.openTo}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {availability.roles.map((role) => (
            <span key={role} className={accentTag()}>
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">Clearance</p>
          <p className="text-foreground/80">{availability.clearance}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">Location</p>
          <p className="text-foreground/80">{availability.location}</p>
        </div>
      </div>
    </div>
  );
}
