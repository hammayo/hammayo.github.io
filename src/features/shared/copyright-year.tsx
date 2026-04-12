'use client';

import { useState, useEffect } from 'react';

interface CopyrightYearProps {
  launchYear: number;
}

export function CopyrightYear({ launchYear }: CopyrightYearProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = new Date().getFullYear();

  if (!mounted) {
    return <span>{launchYear}</span>;
  }

  return (
    <span>{launchYear === current ? current : `${launchYear}–${current}`}</span>
  );
}
