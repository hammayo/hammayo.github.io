"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Container } from "./container";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { basePath } from "@/lib/env";

const NAV_LINKS = [
  { href: "/about",    label: "About"    },
  { href: "/projects", label: "Projects" },
  { href: "/blogs",    label: "Blogs"    },
  { href: "/contact",  label: "Contact"  },
] as const;

function NavLink({ href, label, pathname, onClick }: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
}) {
  // Strip trailing slash before comparing (Next.js can return either form)
  const isActive = pathname.replace(/\/$/, '') === href;

  return (
    <Link
      href={href}
      prefetch
      onClick={onClick}
      className={cn(
        "tracking-tight transition-all duration-300 font-medium",
        isActive
          ? "font-semibold"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {isActive ? (
        <span
          className="text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)',
            backgroundSize: '300%',
          }}
        >
          {label}
        </span>
      ) : label}
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
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50"
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
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
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
