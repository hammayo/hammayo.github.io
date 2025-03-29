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

// Initialize Google Analytics
if (typeof window !== 'undefined' && env.GA_MEASUREMENT_ID) {
  const gaId = env.GA_MEASUREMENT_ID;
  
  // Create script elements
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  
  const inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', {
      page_path: window.location.pathname,
      transport_type: 'beacon',
      send_page_view: true
    });
  `;
  
  // Append scripts to document
  document.head.appendChild(gtagScript);
  document.head.appendChild(inlineScript);
  
  logger.debug(`📊 Google Analytics initialized for ${gaId}`);
}

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
