"use client";

import React, { ReactNode } from "react";
import { CardEffects, cardBaseClasses } from "@/components/ui/card-effects";

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
      icon: "dark:border-purple-500/30 border-purple-300/30 group-hover:border-purple-500/50",
      title: "bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500",
      button: "bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 hover:from-purple-600 hover:via-cyan-600 hover:to-green-600",
    },
    linkedin: {
      icon: "dark:border-blue-500/30 border-blue-300/30 group-hover:border-blue-500/50",
      title: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
      button: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600",
    },
    email: {
      icon: "dark:border-cyan-500/30 border-cyan-300/30 group-hover:border-cyan-500/50",
      title: "bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500",
      button: "bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600",
    },
  };

  const currentVariant = variants[variant];

  return (
    <CardEffects>
      <div className="flex flex-col items-center gap-4 p-8">
        <div className={`w-16 h-16 flex items-center justify-center border rounded-full dark:bg-black/30 bg-white/30 backdrop-blur-md transition-all duration-300 ${currentVariant.icon}`}>
          {icon}
        </div>
        <div className="flex flex-col items-center mt-2">
          <h3 className={`text-xl font-medium tracking-tight text-transparent bg-clip-text transition-all duration-300 opacity-80 group-hover:opacity-100 ${currentVariant.title}`}>
            {title}
          </h3>
          <span className={`mt-4 text-sm text-center ${cardBaseClasses.description}`}>
            {subtitle}
          </span>
        </div>
        <a
          href={link}
          target={link.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className={`${cardBaseClasses.button} mt-6 text-white ${currentVariant.button}`}
        >
          {linkText}
        </a>
      </div>
    </CardEffects>
  );
}
