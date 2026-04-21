'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { SCHEMES, SCHEME_ORDER, type SchemeName } from '@/design/schemes';
import { useScheme } from '@/providers/scheme-provider';
import { Button } from '@/features/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/shared/ui/dropdown-menu';

const SCHEME_LABELS: Record<SchemeName, string> = {
  silver: 'Silver',
  glass: 'Glass',
  'nebula': 'Nebula',
  'violet-blue': 'Violet Blue',
};

const SCHEME_TIMES: Record<SchemeName, string> = {
  silver: '06–12',
  glass: '12–18',
  'nebula': '18–22',
  'violet-blue': '22–06',
};

function SchemeSwatch({ name }: { name: SchemeName }) {
  const { from, via, to } = SCHEMES[name];
  return (
    <span
      className="inline-block h-3 w-3 rounded-full flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${from}, ${via}, ${to})` }}
      aria-hidden
    />
  );
}

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { schemeName, pinnedScheme, setPinnedScheme } = useScheme();

  const radioValue = pinnedScheme ?? 'auto';

  const handleSchemeChange = (value: string) => {
    if (value === 'auto') {
      setPinnedScheme(null);
    } else {
      setPinnedScheme(value as SchemeName);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" sideOffset={8} className="min-w-52 w-[min(13rem,calc(100vw-2rem))]">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Appearance</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Colour scheme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={radioValue} onValueChange={handleSchemeChange}>
          {SCHEME_ORDER.map((name) => (
            <DropdownMenuRadioItem key={name} value={name} className="gap-2">
              <SchemeSwatch name={name} />
              <span>{SCHEME_LABELS[name]}</span>
              <span className="ml-auto text-[10px] text-muted-foreground/60 tabular-nums">
                {SCHEME_TIMES[name]}
              </span>
            </DropdownMenuRadioItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="auto" className="gap-2">
            <span className="inline-block h-3 w-3 rounded-full flex-shrink-0 border border-dashed border-muted-foreground/40" aria-hidden />
            <span>Auto</span>
            {!pinnedScheme && (
              <span className="ml-auto text-[10px] text-muted-foreground/60">{schemeName}</span>
            )}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
