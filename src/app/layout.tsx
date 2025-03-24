import "./globals.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/header";
import { AnimatedBackground } from "@/components/animated-background";
import { basePath } from "@/lib/env";
import { SITE, THEME } from "@/lib/constants";
import { Analytics } from "@/components/analytics";
import { RouteProgress } from "@/components/route-progress";
import { Footer } from "@/components/footer";
import { ErrorBoundary } from "@/components/error-boundary";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.author }],
  keywords: SITE.keywords,
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
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <ThemeProvider attribute="class" defaultTheme={THEME.defaultTheme} enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <div className="min-h-screen bg-background text-foreground relative flex flex-col">
              <AnimatedBackground />
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
