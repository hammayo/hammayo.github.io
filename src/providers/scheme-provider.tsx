'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useTheme } from 'next-themes';
import {
  SCHEMES,
  SCHEME_DEFAULT,
  SCHEME_MODE,
  SCHEME_ORDER,
  CYCLE_SPEED_MS,
  CYCLE_SPEED,
  type SchemeName,
  type ColorScheme,
  resolveTimeOfDayScheme,
} from '@/design/schemes';

interface SchemeContextValue {
  schemeName: SchemeName;
  scheme: ColorScheme;
}

const SchemeContext = createContext<SchemeContextValue>({
  schemeName: SCHEME_DEFAULT,
  scheme: SCHEMES[SCHEME_DEFAULT],
});

export function useScheme(): SchemeContextValue {
  return useContext(SchemeContext);
}

function applyScheme(
  name: SchemeName,
  resolvedTheme: string | undefined
): void {
  const scheme = SCHEMES[name];
  const isDark = resolvedTheme === 'dark';

  const from = scheme.from;
  const via  = scheme.via;
  const to   = scheme.to;

  const root = document.documentElement;
  root.style.setProperty('--scheme-from', from);
  root.style.setProperty('--scheme-via', via);
  root.style.setProperty('--scheme-to', to);
  root.style.setProperty('--scheme-button-from', scheme.buttonFrom);
  root.style.setProperty('--scheme-button-via', scheme.buttonVia);
  root.style.setProperty('--scheme-button-to', scheme.buttonTo);
  root.style.setProperty('--scheme-glow', isDark ? scheme.glow : scheme.glow.replace('0.25', '0.15'));
  root.style.setProperty('--scheme-accent', scheme.accent);
  root.style.setProperty('--scheme-border', scheme.border);
  root.style.setProperty('--scheme-transition', `${scheme.transitionMs}ms`);

  root.style.setProperty(
    'transition',
    `--scheme-from ${scheme.transitionMs}ms ease-in-out,
     --scheme-via ${scheme.transitionMs}ms ease-in-out,
     --scheme-to ${scheme.transitionMs}ms ease-in-out`
  );
}

export function SchemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [schemeName, setSchemeName] = useState<SchemeName>(SCHEME_DEFAULT);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const schemeIndexRef = useRef(0);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    setMounted(true);

    if (prefersReducedMotion) {
      setSchemeName(SCHEME_DEFAULT);
      applyScheme(SCHEME_DEFAULT, resolvedTheme);
      return;
    }

    if (SCHEME_MODE === 'time-of-day') {
      const resolved = resolveTimeOfDayScheme();
      setSchemeName(resolved);
      applyScheme(resolved, resolvedTheme);
      return;
    }

    if (SCHEME_MODE === 'config') {
      setSchemeName(SCHEME_DEFAULT);
      applyScheme(SCHEME_DEFAULT, resolvedTheme);
      return;
    }

    // SCHEME_MODE === 'cycle'
    const cycleMs = CYCLE_SPEED_MS[CYCLE_SPEED];
    const cycle = () => {
      schemeIndexRef.current = (schemeIndexRef.current + 1) % SCHEME_ORDER.length;
      const next = SCHEME_ORDER[schemeIndexRef.current];
      setSchemeName(next);
      applyScheme(next, resolvedTheme);
    };
    intervalRef.current = setInterval(cycle, cycleMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-apply scheme when theme (dark/light) changes
  useEffect(() => {
    if (!mounted) return;
    applyScheme(schemeName, resolvedTheme);
  }, [resolvedTheme, schemeName, mounted]);

  const value: SchemeContextValue = {
    schemeName,
    scheme: SCHEMES[schemeName],
  };

  return (
    <SchemeContext.Provider value={value}>
      {children}
    </SchemeContext.Provider>
  );
}
