import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { AboutContent } from "@/features/about/about-content";
import { PAGE_META, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { about } from "../../../content/about";

export const metadata: Metadata = {
  title: PAGE_META.about.title,
  description: PAGE_META.about.description,
  openGraph: {
    title: PAGE_META.about.title,
    description: PAGE_META.about.description,
    url: `${SITE_URL}/about`,
  },
  twitter: {
    title: PAGE_META.about.title,
    description: PAGE_META.about.description,
  },
};

export default function AboutPage() {
  return (
    <PageTransitionWrapper>
      <Container>
        <AboutContent about={about} />
      </Container>
    </PageTransitionWrapper>
  );
}
