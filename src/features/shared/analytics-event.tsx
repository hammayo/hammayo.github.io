'use client';

import { useEffect } from 'react';
import { sendAnalyticsEvent } from './analytics';

type PageName = 'home' | 'about' | 'projects' | 'blogs' | 'cv' | 'contact' | 'blog-post';

type PageViewEventProps = {
  page: PageName;
};

export function PageViewEvent({ page }: PageViewEventProps) {
  useEffect(() => {
    sendAnalyticsEvent({
      action: 'page_view',
      category: 'navigation',
      label: page,
      page_title: page,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [page]);

  return null;
}
