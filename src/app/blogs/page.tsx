import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import type { Metadata } from "next";
import { PageViewEvent } from "@/features/shared/analytics-event";

export const metadata: Metadata = {
  title: "Blogs",
  description: "My tech notes",
};

export default function ContactPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="blogs" />
      <Container>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Blogs</h1>
          <p className="text-muted-foreground">Start writing blogs.</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 mx-auto sm:grid-cols-3">
          Convert MD notes to Blogs WIP - MDX
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
