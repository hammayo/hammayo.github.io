import { Container } from '@/features/shared/container';
import { Hero } from '@/features/home/hero';
import { HomepageBio } from '@/features/home/homepage-bio';
import { SkillsStrip } from '@/features/home/skills-strip';
import { CTARow } from '@/features/home/cta';
import { RecentPosts } from '@/features/home/recent-posts';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { about } from '../../content/about';
import { cv } from '../../content/cv';
import { getAllPostsMeta } from '@/features/blogs/pipeline';

export default function HomePage() {
  const recentPosts = getAllPostsMeta().slice(0, 3);

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="home" />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Container className="text-center space-y-8">
          <div className="opacity-0 animate-fade-in animate-delay-500">
            <Hero />
          </div>
          <div className="opacity-0 animate-fade-in animate-delay-200">
            <HomepageBio
              template={about.homepageBioTemplate}
              extra={about.homepageBioExtra}
              careerStartYear={about.careerStartYear}
            />
          </div>
          <div className="opacity-0 animate-fade-in animate-delay-300">
            <SkillsStrip skills={cv.skills} />
          </div>
          <div className="opacity-0 animate-fade-in animate-delay-400">
            <CTARow />
          </div>
          <div className="opacity-0 animate-fade-in animate-delay-500">
            <RecentPosts posts={recentPosts} />
          </div>
        </Container>
      </div>
    </PageTransitionWrapper>
  );
}
