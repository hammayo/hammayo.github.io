"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import React from "react";

export const RouteProgress = React.memo(function RouteProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show the progress bar
    setVisible(true);

    // Simulate progress
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const simulateProgress = () => {
      setProgress(0); // Reset progress
      let simulatedProgress = 0;

      interval = setInterval(() => {
        simulatedProgress += Math.random() * 10;
        if (simulatedProgress > 90) {
          clearInterval(interval);
        }
        setProgress(Math.min(simulatedProgress, 90));
      }, 100);

      // Complete the progress after content has likely loaded
      timeout = setTimeout(() => {
        setProgress(100);
        // Hide after completion animation
        setTimeout(() => setVisible(false), 200);
      }, 600);
    };

    simulateProgress();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  if (!visible && progress === 0) return null;

  return (
    <Progress
      value={progress}
      className="fixed top-0 left-0 right-0 z-[100] h-1 w-full bg-transparent rounded-none transition-opacity duration-200"
      style={{
        opacity: visible ? 1 : 0,
        background: "transparent"
      }}
      indicatorClassName="bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500"
    />
  );
});
