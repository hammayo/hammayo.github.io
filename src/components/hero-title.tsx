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
    <div className="max-w-6xl mx-auto">
      <CardEffects variant="featured" className="rounded-2xl">
        <div className="px-16 py-10 md:py-14">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight letter-spacing-mono-normal">
            <span className="block leading-none text-zinc-800 dark:text-zinc-200">
              Hello, I am
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 leading-tight opacity-90 group-hover:opacity-100 transition-opacity duration-500">
              HAMMAYO
            </span>
          </h1>
          <div
            className="mt-4 h-1.5 w-40 md:w-64 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            style={mounted ? { boxShadow } : {}}
          />
        </div>
      </CardEffects>
    </div>
  );
}
