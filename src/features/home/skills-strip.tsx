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

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {all.map((skill) => (
        <span key={skill} className={accentTag()}>
          {skill}
        </span>
      ))}
    </div>
  );
}
