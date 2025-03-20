// Type definitions for Google Analytics gtag
interface Window {
  gtag: (
    command: 'config' | 'event' | 'set',
    targetId: string,
    config?: {
      page_path?: string;
      page_location?: string;
      page_title?: string;
      send_to?: string;
      event_category?: string;
      event_label?: string;
      value?: number;
      [key: string]: any;
    }
  ) => void;
}
 