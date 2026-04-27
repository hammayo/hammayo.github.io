'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faMoon, faDisplay, faPalette,
  faCircleHalfStroke, faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';

import { SCHEMES, SCHEME_ORDER, type SchemeName } from '@/design/schemes';
import { useScheme } from '@/providers/scheme-provider';
import { Button } from '@/features/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/shared/ui/dropdown-menu';

const SCHEME_LABELS: Record<SchemeName, string> = {
  silver: 'Silver',
  glass: 'Glass',
  nebula: 'Nebula',
  'violet-blue': 'Violet Blue',
};

const SCHEME_TIMES: Record<SchemeName, string> = {
  silver: '06–12',
  glass: '12–18',
  nebula: '18–22',
  'violet-blue': '22–06',
};

function SchemeSwatch({ name }: { name: SchemeName }) {
  const { from, via, to } = SCHEMES[name];
  return (
    <span
      className="inline-block h-3 w-3 rounded-full shrink-0"
      style={{ background: `linear-gradient(135deg, ${from}, ${via}, ${to})` }}
      aria-hidden
    />
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { schemeName, pinnedScheme, setPinnedScheme } = useScheme();

  const radioValue = pinnedScheme ?? 'auto';

  const handleSchemeChange = (value: string) => {
    if (value === 'auto') {
      setPinnedScheme(null);
    } else {
      setPinnedScheme(value as SchemeName);
    }
  };

  const appearanceItems = [
    { value: 'light',  label: 'Light',  icon: faSun },
    { value: 'dark',   label: 'Dark',   icon: faMoon },
    { value: 'system', label: 'System', icon: faCircleHalfStroke },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <FontAwesomeIcon icon={faSun} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <FontAwesomeIcon icon={faMoon} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" sideOffset={8} className="min-w-52 w-[min(13rem,calc(100vw-2rem))]">

        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal flex items-center gap-1.5">
          <FontAwesomeIcon icon={faDisplay} className="h-3.5 w-3.5" />
          Appearance
        </DropdownMenuLabel>

        {appearanceItems.map(({ value, label, icon }) => {
          const active = theme === value;
          return (
            <DropdownMenuItem
              key={value}
              inset
              onClick={() => setTheme(value)}
              className="gap-2"
              style={active ? { background: 'color-mix(in srgb, var(--scheme-accent) 10%, transparent)', color: 'var(--scheme-accent-text)' } : undefined}
            >
              <FontAwesomeIcon icon={icon} className="h-3 w-3 shrink-0" />
              <span>{label}</span>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal flex items-center gap-1.5">
          <FontAwesomeIcon icon={faPalette} className="h-3.5 w-3.5" />
          Colour scheme
        </DropdownMenuLabel>

        {SCHEME_ORDER.map((name) => {
          const active = radioValue === name;
          return (
            <DropdownMenuItem
              key={name}
              inset
              onClick={() => handleSchemeChange(name)}
              className="gap-2"
              style={active ? { background: 'color-mix(in srgb, var(--scheme-accent) 10%, transparent)', color: 'var(--scheme-accent-text)' } : undefined}
            >
              <SchemeSwatch name={name} />
              <span>{SCHEME_LABELS[name]}</span>
              <span className="ml-auto text-[10px] tabular-nums" style={{ color: active ? 'var(--scheme-accent-text)' : undefined }}>
                {SCHEME_TIMES[name]}
              </span>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          inset
          onClick={() => handleSchemeChange('auto')}
          className="gap-2"
          style={radioValue === 'auto' ? { background: 'color-mix(in srgb, var(--scheme-accent) 10%, transparent)', color: 'var(--scheme-accent-text)' } : undefined}
        >
          <FontAwesomeIcon icon={faClock} className="h-3 w-3 shrink-0" />
          <span>Auto</span>
          {!pinnedScheme && (
            <span className="ml-auto text-[10px] text-muted-foreground/60 tabular-nums">{schemeName}</span>
          )}
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
