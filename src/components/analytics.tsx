'use client';

import { env } from '@/lib/env';
import { logger } from '@/lib/logger';

// Analytics event types
type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// Send a custom event to Google Analytics
export const sendAnalyticsEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined' && env.GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: env.GA_MEASUREMENT_ID,
    });
    logger.debug(`📊 Event sent: ${action} - ${category}${label ? ` - ${label}` : ''}`);
  }
};
