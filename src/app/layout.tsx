import "./globals.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/header";
import { AnimatedBackgroundClient } from "@/components/animated-background-client";
import { basePath } from "@/lib/env";
import { SITE, THEME } from "@/lib/constants";
import { RouteProgress } from "@/components/route-progress";
import { Footer } from "@/components/footer";
import { ErrorBoundary } from "@/components/error-boundary";
import { Analytics } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import Script from 'next/script'

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hammayo.github.io'),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.author }],
  keywords: SITE.keywords,
  alternates: {
    canonical: 'https://hammayo.github.io',
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
    url: 'https://hammayo.github.io',
    siteName: "Hammayo's Portfolio",
    title: "Hammayo's | Backend Software Engineer",
    description: 'Portfolio site showcasing dev projects.',
    images: [
      {
        url: '/screenshots/home.png',
        width: 1200,
        height: 630,
        alt: "Hammayo's Portfolio Homepage",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hammayo's | Backend Software Engineer",
    description: 'Portfolio site showcasing dev projects.',
    images: ['/screenshots/home.png'],
  },
  icons: {
    icon: [
      {
        url: `${basePath}/icons/favicon.ico`,
        sizes: "any",
      },
      {
        url: `${basePath}/icons/favicon-32x32.png`,
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: `${basePath}/icons/favicon-16x16.png`,
        type: "image/png",
        sizes: "16x16",
      }
    ],
    apple: {
      url: `${basePath}/icons/apple-touch-icon.png`,
      sizes: "180x180",
    },
  },
  manifest: process.env.NODE_ENV === 'development' 
    ? '/icons/site.webmanifest'
    : `${basePath}/icons/site.webmanifest`
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME.lightThemeColor },
    { media: "(prefers-color-scheme: dark)", color: THEME.darkThemeColor },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <ThemeProvider attribute="class" defaultTheme={THEME.defaultTheme} enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <div className="min-h-screen bg-background text-foreground relative flex flex-col">
              <AnimatedBackgroundClient />
              <Header />
              <RouteProgress />
              <main className="flex-1 pt-2 container mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
