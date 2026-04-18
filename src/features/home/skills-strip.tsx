import { accentTag } from '@/design/variants';

interface SkillsStripProps {
  skills: {
    languages: string[];
    platforms: string[];
    tools:     string[];
  };
}

export function SkillsStrip({ skills }: SkillsStripProps) {
  const all = [...skills.languages, ...skills.platforms, ...skills.tools];

  if (all.length === 0) return null;

  // Duplicate for seamless loop — CSS marquee translates -50% to return to start
  const doubled = [...all, ...all];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex gap-2 w-max animate-[marquee_30s_linear_infinite]">
        {doubled.map((skill, i) => (
          <span key={i} className={accentTag()}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
