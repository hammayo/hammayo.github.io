import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { PAGE_META, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { blogsConfig as _blogsConfig } from "../../../content/blogs";

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
        <p className="text-muted-foreground">Blog coming soon…</p>
      </Container>
    </PageTransitionWrapper>
  );
}
