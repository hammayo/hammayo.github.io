"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CardEffects } from "@/components/ui/card-effects";
import TextGradient from "@/components/ui/text-gradient";

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

interface TitleContentProps {
  isLoading?: boolean;
  scheme?: typeof COLOR_SCHEMES[number];
  currentGlow?: string;
  isDesktop: boolean;
}

const TitleContent: React.FC<TitleContentProps> = ({ isLoading, scheme, currentGlow, isDesktop }) => (
  <div className="px-0 min-[314px]:px-2 sm:px-8 md:px-16 py-10 md:py-14 relative">
    <h1 className="text-center">
      <span className="block text-xl sm:text-2xl md:text-4xl mb-4 text-zinc-700 dark:text-zinc-200">
        Hello, I am
      </span>
      <span className={`block text-4xl md:text-8xl font-bold ${!isLoading ? `text-transparent bg-clip-text bg-gradient-to-r ${scheme?.text}` : ''}`}>
        <span className="text-8xl font-bold mb-4 md:px-4 px-0">
          <TextGradient
            text={isDesktop ? "HAMMAYO" : "HAMMY"}
            className={`${isDesktop ? "hidden md:inline" : "md:hidden text-4xl min-[314px]:text-5xl"}`}
          />
        </span>
      </span>
    </h1>

    <div className={`mt-6 h-1.5 w-32 sm:w-40 md:w-64 mx-auto rounded-full ${!isLoading ? `bg-gradient-to-r ${scheme?.text}` : ''}`}
         style={!isLoading ? { boxShadow: `0 0 15px ${currentGlow}` } : undefined}/>
  </div>
);

export function HeroTitle() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentScheme((current) => (current + 1) % COLOR_SCHEMES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if we're on desktop (md breakpoint is typically 768px)
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Initial check
    checkIfDesktop();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfDesktop);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  const scheme = COLOR_SCHEMES[currentScheme];
  const glowOpacity = resolvedTheme === 'dark' ? '0.3' : '0.15';
  const currentGlow = scheme.glow.replace('0.15', glowOpacity);

  return (
    <div className="max-w-6xl mx-auto">
      <CardEffects variant="featured" className="rounded-2xl overflow-hidden">
        <TitleContent
          isLoading={!mounted}
          scheme={mounted ? scheme : undefined}
          currentGlow={mounted ? currentGlow : undefined}
          isDesktop={isDesktop}
        />
      </CardEffects>
    </div>
  );
}
