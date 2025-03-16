"use client";

import React, { useEffect, useRef } from "react";

interface PageHeadingProps {
  title: string;
  description?: string;
}

export function PageHeading({ title, description }: PageHeadingProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Ensure headings are visible immediately on page load
    if (titleRef.current) {
      titleRef.current.style.opacity = "1";
    }
    if (descRef.current) {
      descRef.current.style.opacity = "1";
    }
  }, []);

  return (
    <div className="mb-12 relative z-10">
      <h1
        ref={titleRef}
        className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 tracking-tight opacity-100 transition-none pointer-events-auto"
        style={{
          // Force visibility with inline styles for maximum reliability
          opacity: 1,
          visibility: "visible",
          animation: "none",
          willChange: "auto",
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          ref={descRef}
          className="text-muted-foreground tracking-tight opacity-100 transition-none pointer-events-auto"
          style={{
            // Force visibility with inline styles for maximum reliability
            opacity: 1,
            visibility: "visible",
            animation: "none",
            willChange: "auto",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
