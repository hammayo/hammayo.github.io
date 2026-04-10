"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Container } from "./container";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { basePath } from "@/lib/env";

const NAV_LINKS = [
  { href: "/about",    label: "About"    },
  { href: "/projects", label: "Projects" },
  { href: "/blogs",    label: "Blogs"    },
  { href: "/contact",  label: "Contact"  },
] as const;

const gradientClasses =
  "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 font-medium";
const inactiveClasses =
  "dark:text-zinc-400 text-zinc-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:via-cyan-500 hover:to-green-500";

function NavLink({ href, label, pathname, onClick }: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      prefetch
      onClick={onClick}
      className={cn(
        "duration-300 transition-all tracking-tight",
        pathname === href ? gradientClasses : inactiveClasses
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname  = usePathname();
  const logoPath  = `${basePath}/images/_hb-logo.png`;
  const [open, setOpen] = useState(false);

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 dark:bg-zinc-950/80 bg-white/80 backdrop-blur-xl border-b dark:border-zinc-800/50 border-zinc-200/50"
    >
      <Container>
        <nav role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <Link
              href="/"
              prefetch
              className="text-base font-semibold tracking-tighter flex items-center gap-2 transition-transform"
            >
              <Image
                src={logoPath}
                alt="HB"
                width={28}
                height={28}
                priority
                unoptimized
                className="animate-float"
              />
              <span
                className="md:inline hidden animate-gradient text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)', backgroundSize: '400%' }}
              >Hammayo</span>
              <span
                className="md:hidden animate-gradient text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)', backgroundSize: '400%' }}
              >Hammy</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} pathname={pathname} />
              ))}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button
                    aria-label="Open navigation"
                    className="p-2 rounded-md dark:text-zinc-400 text-zinc-600 hover:text-foreground transition-colors"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 pt-12">
                  <nav aria-label="Mobile navigation" className="flex flex-col gap-6 mt-4">
                    {NAV_LINKS.map(({ href, label }) => (
                      <NavLink
                        key={href}
                        href={href}
                        label={label}
                        pathname={pathname}
                        onClick={() => setOpen(false)}
                      />
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
