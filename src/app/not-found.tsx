"use client";

import { Container } from "@/components/container";
import { Suspense } from "react";
import Link from "next/link";

function NotFoundContent() {
  return (
    <Container className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-144px)]">
      <div className="mb-8 relative">
        <div 
          className="text-9xl font-bold opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-cyan-800 to-green-800 select-none" 
          style={{ fontSize: "240px" }}
        >
          404
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 tracking-tight">
            Captain&apos;s Log, Supplement - Stardate 40400.0
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed tracking-tight">
              Alert: You&apos;ve entered an uncharted sector of the codebase.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed tracking-tight">
              Sensors indicate this spatial anomaly corresponds to a 404 Error — no quantum signature detected.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed tracking-tight">
              Starfleet Command is standing by to assist.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              replace
              className="px-6 py-3 text-sm font-medium text-white rounded-md bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 hover:from-purple-600 hover:via-cyan-600 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 tracking-tight z-50 relative"
            >
              Return to Main Bridge
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
