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
import { StructuredData } from '@/features/shared/structured-data';
import Script from 'next/script';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-inter',
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
    images: [
      {
        url: `${SITE_URL}/screenshots/home.png`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} Homepage`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [`${SITE_URL}/screenshots/home.png`],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_MEASUREMENT_ID}');
          `}
        </Script>
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
      </body>
    </html>
  );
}
