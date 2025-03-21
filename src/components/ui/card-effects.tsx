"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface CardEffectsProps {
  children: React.ReactNode;
  variant?: "default" | "featured";
  className?: string;
}

export function CardEffects({ children, variant = "default", className = "" }: CardEffectsProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = React.useCallback(
    ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className={`group relative h-full ${className}`}
    >
      <div className={`relative h-full overflow-hidden transition-all duration-500 rounded-xl
        ${variant === "featured"
          ? 'bg-gradient-to-br from-white via-purple-50/40 to-cyan-50/30 dark:from-zinc-900/60 dark:via-purple-900/30 dark:to-blue-900/40' 
          : 'bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100/30 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-800/50'} 
        backdrop-blur-[1px]
        hover:backdrop-blur-[2px]
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]
        group-hover:shadow-[0_8px_30px_-4px_rgba(124,58,237,0.1)] dark:group-hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5)]
        border border-zinc-200/50 dark:border-white/[0.05]
        group-hover:border-purple-300/50 dark:group-hover:border-purple-500/20
        ${variant === "featured" ? 'ring-1 ring-purple-300/40 dark:ring-purple-500/10' : ''}`}
      >
        {/* Dynamic gradient backgrounds */}
        <div className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-cyan-200/15 to-pink-200/20 dark:from-purple-500/[0.05] dark:via-cyan-500/[0.05] dark:to-pink-500/[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-tl from-green-200/15 via-blue-200/15 to-purple-200/20 dark:from-green-500/[0.03] dark:via-blue-500/[0.04] dark:to-purple-500/[0.05]" />
        </div>

        {/* Glassmorphic spotlight effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(124,58,237,0.08),
              transparent 80%
            )`,
          }}
        />

        {/* Gradient border glow */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(124,58,237,0.1),
              transparent 80%
            )`,
          }}
        />

        {/* Content wrapper with backdrop */}
        <div className="relative h-full z-10 bg-white/60 dark:bg-black/10 backdrop-blur-[2px] group-hover:bg-purple-50/30 dark:group-hover:bg-black/20 transition-colors duration-500">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// Reusable class names for consistent styling
export const cardBaseClasses = {
  contentWrapper: "relative flex flex-col gap-4 p-6",
  title: "font-semibold tracking-tight text-zinc-800 group-hover:text-purple-950 dark:text-zinc-100 dark:group-hover:text-white transition-colors",
  description: "text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-purple-900/90 dark:group-hover:text-zinc-300 transition-colors",
  badge: "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm shadow-purple-500/10 dark:shadow-black/20 backdrop-blur-[2px] group-hover:shadow-purple-500/20 transition-all duration-500",
  tag: "px-2 py-1 text-xs rounded-md bg-purple-100/60 text-purple-900 dark:bg-purple-500/10 dark:text-purple-300 border border-purple-300/40 dark:border-purple-500/10 group-hover:bg-purple-200/60 group-hover:border-purple-400/40 dark:group-hover:bg-purple-500/20 transition-colors duration-500 backdrop-blur-[2px]",
  button: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-500 shadow-sm shadow-purple-500/10 dark:shadow-black/20 hover:shadow-md hover:shadow-purple-500/20 dark:hover:shadow-black/30 backdrop-blur-[2px] focus:outline-none focus:ring-2 focus:ring-purple-500/40 dark:focus:ring-purple-500/40 focus:ring-offset-2",
  buttonGradient: {
    default: "bg-gradient-to-r from-purple-200/80 via-cyan-200/80 to-pink-200/80 hover:from-purple-300/90 hover:via-cyan-300/90 hover:to-pink-300/90 text-purple-950 dark:from-purple-500/70 dark:via-cyan-500/70 dark:to-pink-500/70 dark:hover:from-purple-500/80 dark:hover:via-cyan-500/80 dark:hover:to-pink-500/80 dark:text-white",
    featured: "bg-gradient-to-r from-purple-500/90 via-cyan-500/90 to-pink-500/90 hover:from-purple-500 hover:via-cyan-500 hover:to-pink-500 text-white",
  },
}; 