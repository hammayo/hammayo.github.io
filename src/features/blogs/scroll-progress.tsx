'use client';

import { useEffect, useState } from 'react';
import * as Progress from '@radix-ui/react-progress';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct       = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <Progress.Root
      className="fixed top-0 left-0 right-0 z-50 h-[2px] w-full overflow-hidden bg-transparent"
      value={progress}
      aria-label="Reading progress"
    >
      <Progress.Indicator
        className="h-full w-full bg-gradient-to-r from-violet-500 via-cyan-400 to-green-400"
        style={{
          transform: `translateX(-${100 - progress}%)`,
          transition: 'transform 100ms linear',
        }}
      />
    </Progress.Root>
  );
}
