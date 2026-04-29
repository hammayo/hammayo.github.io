'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { env } from '@/lib/env';

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window === 'undefined' || !window.gtag || !env.GA_MEASUREMENT_ID) return;

    window.gtag('event', metric.name, {
      value:            Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category:   'Web Vitals',
      event_label:      metric.id,
      non_interaction:  true,
    });
  });

  return null;
}
