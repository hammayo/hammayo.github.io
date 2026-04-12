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
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className={gradientText({ size: 'heading' })}>{blogs.placeholderTitle}</h1>
            <span className="text-xs px-3 py-1 rounded-full border border-[var(--scheme-border)] text-[var(--scheme-accent)]">
              Coming soon
            </span>
          </div>
          <p className="text-muted-foreground">{blogs.placeholderDescription}</p>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{blogs.comingSoonMessage}</p>
          <Link href="/" className="inline-block text-sm text-[var(--scheme-accent)] hover:underline">
            {blogs.backLinkText}
          </Link>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
