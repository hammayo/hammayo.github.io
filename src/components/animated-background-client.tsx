'use client';

import dynamic from 'next/dynamic';

// Lazy load AnimatedBackground for better performance
export const AnimatedBackgroundClient = dynamic(
  () => import('@/components/animated-background').then(m => ({ default: m.AnimatedBackground })),
  { ssr: false }
);

