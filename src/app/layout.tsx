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

export const metadata: Metadata = {
  title: "Hammayo's Portfolio | Full Stack Developer",
  description: "Hammayo's personal portfolio showcasing web development projects and skills.",
  authors: [{ name: "Hammayo" }],
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
