"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import { basePath } from "@/lib/env";

export function Header() {
  const pathname = usePathname();
  const logoPath = `${basePath}/images/_hb-logo.png`;

  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50 dark:bg-black/10 bg-white/10 backdrop-blur-xl border-b dark:border-zinc-800/20 border-zinc-200/20">
      <Container>
        <nav role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/"
              prefetch
              className="text-xl font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 flex items-center gap-2 transition-transform"
            >
              <Image 
                src={logoPath}
                alt="HB"
                width={38}
                height={38}
                priority
                unoptimized
                className="animate-float"
              />
              <span className="md:inline hidden opacity-100">hammayo</span>
              <span className="md:hidden opacity-100">hammy</span>
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
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
