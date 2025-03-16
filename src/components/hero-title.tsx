"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
    <div className="py-8 md:py-12 relative">
      {/* Background glow effect */}
      <div
        className="absolute -top-20 -left-20 right-0 bottom-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-green-500/10 rounded-full blur-3xl opacity-50 z-0"
        style={{
          width: '140%',
          height: '140%',
        }}
      />

      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight letter-spacing-mono-normal">
          <span className="block leading-none">Hello, I am</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 leading-tight">
            HAMMAYO
          </span>
        </h1>
        <div
          className="mt-4 h-1.5 w-40 md:w-64 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500"
          style={mounted ? { boxShadow } : {}}
        />
      </div>
    </div>
  );
}
