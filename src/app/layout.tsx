import "./globals.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/header";
import { AnimatedBackground } from "@/components/animated-background";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || '';
const basePath = isGithubActions ? `/${repo}` : 'https://hammayo.co.uk';

export const metadata: Metadata = {
  title: "Hammayo's | Backend Software Engineer",
  description: "Hammayo's portfolio showcasing development projects.",
  authors: [{ name: "Hammayo Babar" }],
  keywords: ["backend engineer", "software developer", "portfolio", "web development", "hammy", "HB"],
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
  manifest: `${basePath}/icons/site.webmanifest`
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background text-foreground relative">
            <AnimatedBackground />
            <Header />
            {/* Don't wrap main in animation containers to ensure titles are visible during transitions */}
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
