"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function AsciiTitle() {
  const { theme } = useTheme();
  const asciiArt = `
  ██╗  ██╗ █████╗ ███╗   ███╗███╗   ███╗ █████╗ ██╗   ██╗ ██████╗
  ██║  ██║██╔══██╗████╗ ████║████╗ ████║██╔══██╗╚██╗ ██╔╝██╔═══██╗
  ███████║███████║██╔████╔██║██╔████╔██║███████║ ╚████╔╝ ██║   ██║
  ██╔══██║██╔══██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║  ╚██╔╝  ██║   ██║
  ██║  ██║██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║   ██║   ╚██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝
  `.trim();

  const lines = asciiArt.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 my-8 md:my-16"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-green-500/30 blur-xl opacity-50" />
        <pre
          className="relative font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 p-6 md:p-8 rounded-2xl text-[0.5rem] sm:text-xs md:text-sm lg:text-base overflow-x-auto leading-tight whitespace-pre"
          style={{
            background: theme === 'dark' ? "rgba(20, 20, 20, 0.3)" : "rgba(240, 240, 240, 0.3)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: theme === 'dark' ? "0 8px 32px 0 rgba(0, 0, 0, 0.37)" : "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.05 * index,
                ease: "easeOut",
              }}
            >
              {line}
            </motion.div>
          ))}
        </pre>
      </div>
    </motion.div>
  );
}
