"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Container } from "./container";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 dark:bg-black/10 bg-white/10 backdrop-blur-xl border-b dark:border-zinc-800/20 border-zinc-200/20">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500"
          >
            hammayo
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/projects"
              prefetch
              className={cn(
                "duration-300 transition-all tracking-tight",
                pathname === "/projects"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 font-medium"
                  : "dark:text-zinc-400 text-zinc-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:via-cyan-500 hover:to-green-500"
              )}
            >
              Projects
            </Link>
            <Link
              href="/contact"
              prefetch
              className={cn(
                "duration-300 transition-all tracking-tight",
                pathname === "/contact"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 font-medium"
                  : "dark:text-zinc-400 text-zinc-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:via-cyan-500 hover:to-green-500"
              )}
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
