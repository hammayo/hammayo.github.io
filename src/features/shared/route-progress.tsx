'use client';

import { useEffect, useState, Suspense, memo, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as Progress from '@radix-ui/react-progress';

const ProgressIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clear any in-flight timers from a previous navigation
    timers.current.forEach(clearTimeout);
    timers.current = [];

    // Reset to 0 and show bar
    setProgress(0);
    setVisible(true);

    // Double rAF ensures the browser paints the 0% state before we
    // animate to 100%, giving the CSS transition something to run
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProgress(100);

        // Fade out after the fill animation completes (400ms) + small buffer
        const hide = setTimeout(() => {
          setVisible(false);
          timers.current = [];
        }, 600);
        timers.current.push(hide);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      timers.current.forEach(clearTimeout);
    };
  }, [pathname, searchParams]);

  return (
    <Progress.Root
      className="absolute bottom-0 left-0 right-0 z-[200] h-[2px] w-full overflow-hidden bg-transparent"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease-in-out",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="h-full w-full bg-gradient-to-r from-[var(--scheme-from)] via-[var(--scheme-via)] to-[var(--scheme-to)]"
        style={{
          transform: `translateX(-${100 - progress}%)`,
          transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </Progress.Root>
  );
};

export const RouteProgress = memo(function RouteProgress() {
  return (
    <Suspense fallback={null}>
      <ProgressIndicator />
    </Suspense>
  );
});
