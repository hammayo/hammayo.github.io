"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Blob {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!containerRef.current) return;

    const darkColors = [
      "bg-gradient-to-br from-purple-500/30 to-purple-700/10",
      "bg-gradient-to-br from-cyan-500/30 to-cyan-700/10",
      "bg-gradient-to-br from-green-500/30 to-green-700/10",
      "bg-gradient-to-br from-pink-500/30 to-pink-700/10",
      "bg-gradient-to-br from-blue-500/30 to-blue-700/10",
      "bg-gradient-to-br from-yellow-500/30 to-amber-700/10",
    ];

    const lightColors = [
      "bg-gradient-to-br from-purple-500/40 to-purple-700/20",
      "bg-gradient-to-br from-cyan-500/40 to-cyan-700/20",
      "bg-gradient-to-br from-green-500/40 to-green-700/20",
      "bg-gradient-to-br from-pink-500/40 to-pink-700/20",
      "bg-gradient-to-br from-blue-500/40 to-blue-700/20",
      "bg-gradient-to-br from-yellow-500/40 to-amber-700/20",
    ];

    const currentTheme = resolvedTheme || theme;
    const colors = currentTheme === 'light' ? lightColors : darkColors;

    const generateBlobs = () => {
      const newBlobs: Blob[] = [];
      const count = 8;

      for (let i = 0; i < count; i++) {
        newBlobs.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10, // Larger size between 10-30% of container
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 100 + 60, // Random duration between 60-160 seconds
          delay: Math.random() * -20, // Random delay for starting position
        });
      }

      setBlobs(newBlobs);
    };

    generateBlobs();

    const intervalId = setInterval(generateBlobs, 180000); // Every 3 minutes

    return () => clearInterval(intervalId);
  }, [theme, resolvedTheme]);

  if (!mounted) {
    return <div className="fixed inset-0" />;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute rounded-full ${blob.color} opacity-40 blur-3xl`}
          style={{
            width: `${blob.size}%`,
            height: `${blob.size}%`,
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
            ease: "easeInOut",
            repeat: Infinity,
            delay: blob.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 dark:bg-black/40 bg-white/40 backdrop-blur-[100px]" /> {/* Enhanced blur for glassmorphic effect */}
    </div>
  );
}
