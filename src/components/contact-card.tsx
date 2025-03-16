"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ContactCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
  index: number;
}

export function ContactCard({ title, subtitle, icon: Icon, href, index }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block outline-none focus:ring-2 focus:ring-purple-500 rounded-xl"
      >
        <Card className="overflow-hidden relative duration-700 border p-4 md:p-6 lg:py-12 lg:pb-24 md:p-16 group hover:border-purple-400/50 border-zinc-700 bg-black/30 backdrop-blur-sm hover:bg-zinc-800/30">
          {/* Glassmorphic gradient effect */}
          <div
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br opacity-0 via-purple-500/10 transition duration-1000 group-hover:opacity-100"
            style={{
              maskImage: "radial-gradient(240px at 0px 0px, white, transparent)",
              WebkitMaskImage: "radial-gradient(240px at 0px 0px, white, transparent)"
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-4 md:gap-8">
            <span className="relative flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200">
              <Icon className="w-5 h-5" />
            </span>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-medium duration-150 text-zinc-200 group-hover:text-white">
                {title}
              </span>
              <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                {subtitle}
              </span>
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  );
}
