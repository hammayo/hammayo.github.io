import { Container } from "@/components/container";
import Link from "next/link";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";

export default function NotFoundPage() {
  return (
    <PageTransitionWrapper>
      <Container className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-144px)]">
        <div className="mb-8 relative">
          <div className="text-9xl font-bold opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-cyan-800 to-green-800 select-none" style={{ fontSize: "240px" }}>
            404
          </div>

          <div className="mb-12 relative z-10">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 tracking-tight opacity-100 transition-none pointer-events-auto">
              Page Not Found
            </h1>
            <p className="text-muted-foreground tracking-tight opacity-100 transition-none pointer-events-auto">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-2xl p-6 rounded-2xl backdrop-blur-lg border dark:border-zinc-800/30 border-zinc-200/30 dark:bg-black/10 bg-white/10 group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-500 mb-10">
          {/* Glassmorphic gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 from-purple-500/10 via-cyan-500/5 transition-opacity duration-700 group-hover:opacity-100 rounded-2xl -z-10" />

          <p className="text-lg text-muted-foreground leading-relaxed tracking-tight mb-6">
            It seems like you've ventured into uncharted territory. Don't worry, you can easily navigate back to explore my portfolio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 text-sm font-medium text-white rounded-md bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 hover:from-purple-600 hover:via-cyan-600 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 tracking-tight"
            >
              Return Home
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 text-sm font-medium dark:text-zinc-200 text-zinc-800 rounded-md border dark:border-zinc-800 border-zinc-200 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 backdrop-blur-md tracking-tight"
            >
              View Projects
            </Link>
          </div>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
