"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset transition state on pathname change
  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 10); // Very short timeout to ensure we get past any initial page load transitions

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className="min-h-screen pt-28 pb-20"
      style={{
        // Use opacity for elements other than page headings
        transition: "opacity 0.3s ease",
        opacity: isTransitioning ? 0.99 : 1, // Use 0.99 to avoid triggering some browser optimizations
      }}
    >
      {children}
    </div>
  );
}
