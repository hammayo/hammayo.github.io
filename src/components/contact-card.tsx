"use client";

import React, { ReactNode } from "react";

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  link: string;
  linkText: string;
  variant: "github" | "linkedin" | "email";
}

export function ContactCard({
  icon,
  title,
  subtitle,
  link,
  linkText,
  variant,
}: ContactCardProps) {
  const variants = {
    github: {
      card: "hover:shadow-purple-500/20 hover:border-purple-500/30",
      icon: "dark:border-purple-500/30 border-purple-300/30 group-hover:border-purple-500/50",
      title: "group-hover:from-purple-500 group-hover:via-cyan-500 group-hover:to-green-500",
      button: "from-purple-500 via-cyan-500 to-green-500 hover:from-purple-600 hover:via-cyan-600 hover:to-green-600 hover:shadow-purple-500/20",
    },
    linkedin: {
      card: "hover:shadow-blue-500/20 hover:border-blue-500/30",
      icon: "dark:border-blue-500/30 border-blue-300/30 group-hover:border-blue-500/50",
      title: "group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-purple-500",
      button: "from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 hover:shadow-blue-500/20",
    },
    email: {
      card: "hover:shadow-cyan-500/20 hover:border-cyan-500/30",
      icon: "dark:border-cyan-500/30 border-cyan-300/30 group-hover:border-cyan-500/50",
      title: "group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-teal-500",
      button: "from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 hover:shadow-cyan-500/20",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className={`rounded-xl overflow-hidden border dark:border-zinc-800/50 border-zinc-200/50 dark:bg-black/20 bg-white/20 backdrop-blur-lg p-8 transition-all duration-300 hover:shadow-lg group relative ${currentVariant.card}`}>
      {/* Glassmorphic gradient effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 from-${variant}-500/20 via-${variant}-500/10 transition-opacity duration-700 group-hover:opacity-100 -z-10`}
        style={{
          maskImage: "radial-gradient(240px at center, white, transparent)",
          WebkitMaskImage: "radial-gradient(240px at center, white, transparent)",
        }}
      />

      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className={`w-16 h-16 flex items-center justify-center border rounded-full dark:bg-black/30 bg-white/30 backdrop-blur-md transition-all duration-300 ${currentVariant.icon}`}>
          {icon}
        </div>
        <div className="flex flex-col items-center mt-2">
          <h3 className={`text-xl font-medium dark:text-zinc-200 text-zinc-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 tracking-tight ${currentVariant.title}`}>
            {title}
          </h3>
          <span className="mt-4 text-sm text-center dark:text-zinc-400 text-zinc-600 tracking-tight">
            {subtitle}
          </span>
        </div>
        <a
          href={link}
          target={link.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className={`mt-6 px-5 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r transition-all duration-300 hover:shadow-lg tracking-tight ${currentVariant.button}`}
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}
