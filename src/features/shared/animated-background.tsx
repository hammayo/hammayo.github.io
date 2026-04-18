'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Blob {
  id: number;
  x: number;
  y: number;
  size: number;
  colorVar: string;
  duration: number;
  delay: number;
}

const SCHEME_VARS = [
  'var(--scheme-from)',
  'var(--scheme-via)',
  'var(--scheme-to)',
];

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!containerRef.current) return;

    const generateBlobs = () => {
      const newBlobs: Blob[] = [];
      const count = 8;

      for (let i = 0; i < count; i++) {
        newBlobs.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          colorVar: SCHEME_VARS[Math.floor(Math.random() * SCHEME_VARS.length)],
          duration: Math.random() * 100 + 60,
          delay: Math.random() * -20,
        });
      }

      setBlobs(newBlobs);
    };

    generateBlobs();

    const intervalId = setInterval(generateBlobs, 180000);
    return () => clearInterval(intervalId);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none" />;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${blob.size}%`,
            height: `${blob.size}%`,
            background: `radial-gradient(circle, color-mix(in srgb, ${blob.colorVar} 40%, transparent), color-mix(in srgb, ${blob.colorVar} 5%, transparent))`,
          }}
          initial={{
            x: `${blob.x}%`,
            y: `${blob.y}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${blob.x}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`, `${blob.x}%`],
            y: [`${blob.y}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`, `${blob.y}%`],
            opacity: [0.4, 0.5, 0.4, 0.3],
          }}
          transition={{
            duration: blob.duration,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: blob.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 dark:bg-black/40 bg-white/40 backdrop-blur-[100px]" />
    </div>
  );
}
