import Link from 'next/link';
import { ctaButton } from '@/design/variants';

export function CTARow() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link href="/projects" className={ctaButton({ variant: 'gradient' })}>
        View Projects
      </Link>
      <Link href="/contact" className={ctaButton({ variant: 'ghost' })}>
        Get in Touch
      </Link>
    </div>
  );
}
