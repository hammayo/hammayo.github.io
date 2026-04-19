'use client';

import { useState, useEffect } from 'react';

interface HomepageBioProps {
  template:        string;
  extra:           string[];
  careerStartYear: number;
}

function formatStardate(d: Date): string {
  const year  = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day   = String(d.getDate()).padStart(2, '0');
  return `${year}${month}.${day}`;
}

function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in values ? String(values[key]) : `{${key}}`
  );
}

export function HomepageBio({ template, extra, careerStartYear }: HomepageBioProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stardate = mounted ? formatStardate(new Date()) : '......';
  const years    = mounted ? new Date().getFullYear() - careerStartYear : '..';

  const firstPara = interpolate(template, { stardate, years });

  return (
    <div className="text-sm md:text-base text-muted-foreground leading-relaxed tracking-tight space-y-3">
      <p>{firstPara}</p>
      {extra.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
