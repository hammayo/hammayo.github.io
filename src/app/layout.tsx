import './globals.css';
import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { SchemeProvider } from '@/providers/scheme-provider';
import { Header } from '@/features/shared/header';
import { AnimatedBackgroundClient } from '@/features/shared/animated-background-client';
import { basePath } from '@/lib/env';
import { SITE, THEME, SITE_URL } from '@/lib/constants';
import { Footer } from '@/features/shared/footer';
import { ErrorBoundary } from '@/features/shared/error-boundary';
import { Analytics } from '@/features/shared/analytics';
import { WebVitals } from '@/features/shared/web-vitals';
import { StructuredData } from '@/features/shared/structured-data';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.author }],
  keywords: SITE.keywords,
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-GB':     SITE_URL,
      'x-default': SITE_URL,
    },
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  icons: {
    icon: [
      { url: `${basePath}/icons/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/icons/favicon-32x32.png`, type: 'image/png', sizes: '32x32' },
      { url: `${basePath}/icons/favicon-16x16.png`, type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: `${basePath}/icons/apple-touch-icon.png`, sizes: '180x180' },
  },
  manifest:
    process.env.NODE_ENV === 'development'
      ? '/icons/site.webmanifest'
      : `${basePath}/icons/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME.lightThemeColor },
    { media: '(prefers-color-scheme: dark)', color: THEME.darkThemeColor },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme={THEME.defaultTheme}
          enableSystem
          disableTransitionOnChange
        >
          <SchemeProvider>
            <ErrorBoundary>
              <div className="h-dvh bg-background text-foreground relative flex flex-col overflow-hidden">
                <AnimatedBackgroundClient />
                <Header />
                <main className="flex-1 flex flex-col overflow-y-auto pt-16 pb-4 relative z-[1]">
                  {children}
                </main>
                <Footer className="relative z-[1]" />
              </div>
            </ErrorBoundary>
          </SchemeProvider>
        </ThemeProvider>
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}
