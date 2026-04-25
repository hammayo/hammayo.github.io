type GlowOrigin = 'top' | 'center' | 'left' | 'right' | 'bottom';

const originMap: Record<GlowOrigin, string> = {
  top:    'ellipse at 50% 0%',
  center: 'ellipse at 50% 50%',
  left:   'ellipse at 0% 50%',
  right:  'ellipse at 100% 50%',
  bottom: 'ellipse at 50% 100%',
};

interface SchemeGlowOverlayProps {
  origin?: GlowOrigin;
  className?: string;
}

export function SchemeGlowOverlay({ origin = 'top', className }: SchemeGlowOverlayProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${className ?? ''}`}
      style={{
        background: `radial-gradient(${originMap[origin]}, var(--scheme-glow), transparent 70%)`,
      }}
    />
  );
}
