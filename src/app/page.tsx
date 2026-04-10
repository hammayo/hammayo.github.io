import { Container } from "@/features/shared/container";
import { Hero } from "@/features/home/hero";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { PageViewEvent } from "@/features/shared/analytics-event";

function generateStardate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  return `${year}${month}.${day}`;
}

export default function HomePage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="home" />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Container className="text-center">
          <div className="my-4 opacity-0 animate-fade-in animate-delay-500">
            <Hero />
          </div>
          <div className="opacity-0 animate-fade-in animate-delay-200">
            <div className="text-sm md:text-base text-muted-foreground leading-relaxed tracking-tight space-y-3">
              <p>
                Captain's log, stardate {generateStardate()}: For last 20 years,
                I've boldly navigated the digital frontier, charting solutions
                across uncharted sectors—finance's nebulae, justice's asteroid
                belts, and the bureaucratic wormholes of public service.
              </p>

              <p>
                Armed with a tricorder of Microsoft tech and a starship
                engineered from micro-services and Docker containers at warp
                speed, I've allied with Starfleet's HMPPS to dismantle legacy
                system Borgs and assimilate innovation. My crew? A
                cross-functional away team, trained in the Vulcan discipline of
                clean code and the Klingon art of relentless problem-solving.
              </p>

              <p>
                Mission priority: To seek out new patterns, elevate
                civilizations with scalable tech, and ensure no enterprise is
                left stranded in the alpha quadrant of obsolescence. Engage at
                will — let's pioneer the final frontier of software, where no
                challenge has gone before. 🖖
              </p>
            </div>
          </div>
        </Container>
      </div>
    </PageTransitionWrapper>
  );
}
