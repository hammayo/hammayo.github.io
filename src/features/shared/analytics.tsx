'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { Suspense, useEffect } from 'react';
import { env } from '@/lib/env';

// Analytics event interface
interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Analytics utility function
export function sendAnalyticsEvent({ action, category, label, value, ...rest }: AnalyticsEvent) {
  if (env.GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      ...rest,
    });
  }
}

function AnalyticsTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!env.GA_MEASUREMENT_ID || !window.gtag || !pathname) return;

    const search = searchParams?.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;
    
    window.gtag('config', env.GA_MEASUREMENT_ID, {
      page_path: fullPath,
    });
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  if (!env.GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${env.GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsTracking />
      </Suspense>
    </>
  );
}
