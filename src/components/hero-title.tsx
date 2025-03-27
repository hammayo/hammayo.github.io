"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { CardEffects } from "@/components/ui/card-effects";

// Color scheme configurations
const COLOR_SCHEMES = [
  {
    id: 1,
    name: 'rose-pink',
    background: "from-rose-300/10 via-pink-300/10 to-purple-300/10",
    text: "from-rose-400 via-pink-400 to-purple-400",
    glow: "rgba(244, 114, 182, 0.15)"
  },
  {
    id: 2,
    name: 'blue-cyan',
    background: "from-blue-300/10 via-cyan-300/10 to-teal-300/10",
    text: "from-blue-400 via-cyan-400 to-teal-400",
    glow: "rgba(34, 211, 238, 0.15)"
  },
  {
    id: 3,
    name: 'violet-blue',
    background: "from-violet-300/10 via-indigo-300/10 to-blue-300/10",
    text: "from-violet-400 via-indigo-400 to-blue-400",
    glow: "rgba(129, 140, 248, 0.15)"
  }
] as const;

// Animation configurations
const GRADIENT_ANIMATION = {
  initial: { opacity: 0, backgroundPosition: "0% 50%" },
  animate: { 
    opacity: 1,
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
  },
  exit: { opacity: 0 },
  transition: {
    opacity: { duration: 0.8, ease: "easeInOut" },
    backgroundPosition: {
      duration: 12,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const GRADIENT_STYLE = {
  backgroundSize: "200% 100%",
  transform: "translate3d(0, 0, 0)",
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
  willChange: "opacity, background-position",
};

// Loading state component
const LoadingState = () => (
  <div className="max-w-6xl mx-auto">
    <CardEffects variant="featured" className="rounded-2xl overflow-hidden">
      <div className="px-8 md:px-16 py-10 md:py-14 relative">
        <h1 className="text-center">
          <span className="block text-2xl md:text-4xl mb-4 text-zinc-700 dark:text-zinc-200">
            Hello, I am
          </span>
          <span className="block text-4xl md:text-8xl font-bold">
            <span className="md:hidden">HAMMY</span>
            <span className="hidden md:inline">HAMMAYO</span>
          </span>
        </h1>
        <div className="mt-6 h-1.5 w-40 md:w-64 mx-auto rounded-full" />
      </div>
    </CardEffects>
  </div>
);

export function HeroTitle() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentScheme((current) => (current + 1) % COLOR_SCHEMES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <LoadingState />;

  const scheme = COLOR_SCHEMES[currentScheme];
  const glowOpacity = resolvedTheme === 'dark' ? '0.3' : '0.15';
  const currentGlow = scheme.glow.replace('0.15', glowOpacity);

  return (
    <div className="max-w-6xl mx-auto">
      <CardEffects variant="featured" className="rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={scheme.id}
              className={`absolute inset-0 bg-gradient-to-r ${scheme.background}`}
              {...GRADIENT_ANIMATION}
              style={GRADIENT_STYLE}
            />
          </AnimatePresence>
        </div>

        <div className="px-8 md:px-16 py-10 md:py-14 relative">
          <h1 className="text-center">
            <span className="block text-2xl md:text-4xl mb-4 text-zinc-700 dark:text-zinc-200">
              Hello, I am
            </span>
            <span 
              className={`block text-4xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${scheme.text}`}
            >
              <span className="md:hidden">HAMMY</span>
              <span className="hidden md:inline">HAMMAYO</span>
            </span>
          </h1>

          <div 
            className={`mt-6 h-1.5 w-40 md:w-64 mx-auto rounded-full bg-gradient-to-r ${scheme.text}`}
            style={{ boxShadow: `0 0 15px ${currentGlow}` }}
          />
        </div>
      </CardEffects>
    </div>
  );
}
