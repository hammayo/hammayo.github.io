import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { PAGE_META, SITE_URL } from "@/lib/constants";
import { gradientText } from "@/design/variants";
import Link from "next/link";
import type { Metadata } from "next";
import { blogs } from "../../../content/blogs";

export const metadata: Metadata = {
  title: PAGE_META.blogs.title,
  description: PAGE_META.blogs.description,
  openGraph: {
    title: PAGE_META.blogs.title,
    description: PAGE_META.blogs.description,
    url: `${SITE_URL}/blogs`,
  },
  twitter: {
    title: PAGE_META.blogs.title,
    description: PAGE_META.blogs.description,
  },
};

export default function BlogsPage() {
  return (
    <PageTransitionWrapper>
      <Container>
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
          <div className="flex items-center gap-3">
            <h1 className={gradientText({ size: 'heading' })}>{blogs.placeholderTitle}</h1>
            <span className="text-xs px-3 py-1 rounded-full border border-[var(--scheme-border)] text-[var(--scheme-accent)]">
              Coming soon
            </span>
          </div>
          <p className="text-muted-foreground max-w-md">{blogs.placeholderDescription}</p>
          <p className="text-sm text-muted-foreground">{blogs.comingSoonMessage}</p>
          <Link href="/" className="text-sm text-[var(--scheme-accent)] hover:underline">
            {blogs.backLinkText}
          </Link>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
