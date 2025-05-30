"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container px-4 mx-auto max-w-7xl", className)}>
      {children}
    </div>
  );
}
