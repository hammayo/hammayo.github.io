import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { PAGE_META, SITE_URL } from "@/lib/constants";
import { gradientText } from "@/design/variants";
import type { Metadata } from "next";
import { cv } from "../../../content/cv";

export const metadata: Metadata = {
  title: PAGE_META.cv.title,
  description: PAGE_META.cv.description,
  openGraph: {
    title: PAGE_META.cv.title,
    description: PAGE_META.cv.description,
    url: `${SITE_URL}/cv`,
  },
  twitter: {
    title: PAGE_META.cv.title,
    description: PAGE_META.cv.description,
  },
};

export default function CVPage() {
  return (
    <PageTransitionWrapper>
      <Container>
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
          <div className="flex items-center gap-3">
            <h1 className={gradientText({ size: 'heading' })}>CV</h1>
            <span className="text-xs px-3 py-1 rounded-full border border-[var(--scheme-border)] text-[var(--scheme-accent)]">
              Coming soon
            </span>
          </div>
          <p className="text-muted-foreground max-w-md">{cv.placeholderText}</p>
          <a
            href={cv.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--scheme-accent)] hover:underline"
          >
            View LinkedIn Profile →
          </a>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
