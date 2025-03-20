'use client';

import { env } from '@/lib/env';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { logger } from '@/lib/logger';

// Analytics event types
type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// Send a page view to Google Analytics
const sendPageView = (path: string, search: string) => {
  const url = path + search;
  
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', env.GA_MEASUREMENT_ID || '', {
      page_path: url,
    });
    logger.debug(`📊 Page view sent: ${url}`);
  }
};

// Send a custom event to Google Analytics
export const sendAnalyticsEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    logger.debug(`📊 Event sent: ${action} - ${category}${label ? ` - ${label}` : ''}`);
  }
};

// Initialize Google Analytics
function initializeGA() {
  const gaId = env.GA_MEASUREMENT_ID;
  if (!gaId || typeof window === 'undefined') return;

  // Create script elements manually to avoid Next.js preloading
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
    });
  `;
  
  // Append scripts to document
  document.head.appendChild(gtagScript);
  document.head.appendChild(inlineScript);
  
  logger.debug(`📊 Google Analytics initialized for ${gaId}`);
}

// Page view tracker component that uses the useSearchParams hook
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize GA on mount
  useEffect(() => {
    initializeGA();
  }, []);
  
  // Track page views
  useEffect(() => {
    if (env.GA_MEASUREMENT_ID) {
      const search = searchParams.toString().length > 0 ? `?${searchParams.toString()}` : '';
      sendPageView(pathname, search);
    }
  }, [pathname, searchParams]);
  
  return null;
}

// Main Analytics component
export function Analytics() {
  if (!env.GA_MEASUREMENT_ID) {
    return null;
  }
  
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
