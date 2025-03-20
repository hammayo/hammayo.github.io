"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as Progress from "@radix-ui/react-progress";
import React from "react";

// Create a separate client component that uses useSearchParams
const ProgressIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setProgress(0);
    setProgress(100);    
    setVisible(true);
  }, [pathname, searchParams]);

  return (
    <Progress.Root
      className="fixed top-[64px] left-0 right-0 z-[200] h-[2px] w-full overflow-hidden bg-transparent"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 400ms ease-in-out"
      }}
      value={progress}
    >
      <Progress.Indicator
        className="h-full w-full bg-gradient-to-l from-purple-500 via-cyan-500 to-green-500"
        style={{
          transform: `translateX(-${100 - progress}%)`,
          transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      />
    </Progress.Root>
  );
};

// Main component wrapped with Suspense
export const RouteProgress = React.memo(function RouteProgress() {
  return (
    <Suspense fallback={null}>
      <ProgressIndicator />
    </Suspense>
  );
});
