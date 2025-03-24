"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CardEffects } from "@/components/ui/card-effects";

export function HeroTitle() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [boxShadow, setBoxShadow] = useState("");

  // Only access theme on the client-side
  useEffect(() => {
    setMounted(true);

    const currentTheme = resolvedTheme || theme;
    if (currentTheme === 'dark') {
      setBoxShadow('0 0 15px rgba(168, 85, 247, 0.5), 0 0 30px rgba(6, 182, 212, 0.3)');
    } else {
      setBoxShadow('0 0 15px rgba(168, 85, 247, 0.3), 0 0 30px rgba(6, 182, 212, 0.2)');
    }
  }, [theme, resolvedTheme]);

  return (
    <div className="relative mx-auto max-w-6xl p-6 rounded-2xl backdrop-blur-lg border dark:border-zinc-800/30 border-zinc-200/30 dark:bg-black/10 bg-white/10 group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 from-purple-500/10 via-cyan-500/5 transition-opacity duration-700 group-hover:opacity-100 rounded-2xl -z-10" />
        <div className="max-w-6xl mx-auto">
        <CardEffects variant="featured" className="rounded-2xl">
          <div className="px-16 py-10 md:py-14">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight letter-spacing-mono-normal">
              <span className="block leading-none text-zinc-800 dark:text-zinc-200">
                <span className="text-4xl md:text-8xl">Hello, I am</span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 leading-tight opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-4xl md:hidden">HAMMY</span>
                <span className="hidden md:inline">HAMMAYO</span>
              </span>
            </h1>
            <div
              className="mt-4 h-1.5 w-40 md:w-64 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              style={mounted ? { boxShadow } : {}}
            />
          </div>
        </CardEffects>
      </div>
    </div>
  );
}
