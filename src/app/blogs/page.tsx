import { Container } from "@/components/container";
import { PageHeading } from "@/components/page-heading";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";
import type { Metadata } from "next";
import { PageViewEvent } from "@/components/analytics-event";

export const metadata: Metadata = {
  title: "Blogs",
  description: "My tech notes",
};

export default function ContactPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="blogs" />
      <Container>
        <PageHeading
          title="Blogs"
          description="Start writing blogs."
        />

        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-16 lg:mt-44 sm:grid-cols-3 lg:gap-16">
          Convert MD notes to Blogs WIP - MDX
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
