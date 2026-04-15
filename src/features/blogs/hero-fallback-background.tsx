import { cardBgBase, cardBgOverlay1, cardBgOverlay2 } from '@/features/shared/ui/card-background-classes';

/** Fallback background when no hero image is present.
 *  Uses the same layered background as CardEffects so all surfaces are consistent. */
export function HeroFallbackBackground() {
  return (
    <>
      <div className={`absolute inset-0 ${cardBgBase}`} />
      <div className={`absolute inset-0 ${cardBgOverlay1}`} />
      <div className={`absolute inset-0 ${cardBgOverlay2}`} />
    </>
  );
}
