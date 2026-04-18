'use client';

import { CardEffects } from '@/features/shared/ui/card-effects';
import { GRADIENT_GLASS } from '@/design/variants';

const TitleContent = () => (
  <div className="px-0 min-[314px]:px-2 sm:px-8 md:px-16 py-6 md:py-8 relative">
    <h1 className="text-center">
      <span className="block text-xl sm:text-2xl md:text-4xl mb-4 text-zinc-700 dark:text-zinc-200">
        Hello, I am
      </span>
      <span className="block font-bold">
        <span
          className="hidden md:inline text-8xl animate-gradient text-transparent bg-clip-text"
          style={{ backgroundImage: GRADIENT_GLASS, backgroundSize: '400%' }}
        >HAMMAYO</span>
        <span
          className="md:hidden text-5xl min-[314px]:text-6xl animate-gradient text-transparent bg-clip-text"
          style={{ backgroundImage: GRADIENT_GLASS, backgroundSize: '400%' }}
        >HAMMY</span>
      </span>
    </h1>
    <div className="mt-6 h-1.5 w-32 sm:w-40 md:w-64 mx-auto rounded-full gradient-bg scheme-glow" />
  </div>
);

export function Hero() {
  return (
    <CardEffects variant="featured" className="rounded-2xl overflow-hidden">
      <TitleContent />
    </CardEffects>
  );
}
