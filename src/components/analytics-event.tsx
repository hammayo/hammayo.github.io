'use client';

import { useEffect } from 'react';
import { sendAnalyticsEvent } from './analytics';

type PageViewEventProps = {
  page: string;
};

export function PageViewEvent({ page }: PageViewEventProps) {
  useEffect(() => {
    sendAnalyticsEvent({
      action: 'page_view',
      category: 'navigation',
      label: page,
    });
  }, [page]);

  return null;
}
