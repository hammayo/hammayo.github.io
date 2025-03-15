import { Container } from "@/components/container";
import { HeroTitle } from "@/components/hero-title";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";

export default function HomePage() {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-144px)]">
        <Container className="text-center">
          <div className="my-8 opacity-0 animate-fade-in animate-delay-500">
            <div className="relative mx-auto max-w-2xl p-6 rounded-2xl backdrop-blur-lg border dark:border-zinc-800/30 border-zinc-200/30 dark:bg-black/10 bg-white/10 group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-500">
              {/* Glassmorphic gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 from-purple-500/10 via-cyan-500/5 transition-opacity duration-700 group-hover:opacity-100 rounded-2xl -z-10" />
              <HeroTitle />
            </div>
          </div>

          <div className="opacity-0 animate-fade-in animate-delay-200">
            <p className="text-lg text-muted-foreground leading-relaxed tracking-tight">      
              Captain's log, stardate 2025: For 20 years, I've boldly navigated the digital frontier, charting 
              solutions across uncharted sectors—finance's nebulae, justice's asteroid belts, and the bureaucratic 
              wormholes of public service.

              Armed with a tricorder of Microsoft tech and a starship engineered from micro-services and
              Docker containers at warp speed, I've allied with Starfleet's HMPPS to dismantle 
              legacy system Borgs and assimilate innovation. My crew? A crosss-functional away team, trained 
              in the Vulcan discipline of clean code and the Klingon art of relentless problem-solving. 

              Mission priority: To seek out new patterns, elevate civilizations with scalable tech, and ensure 
              no enterprise is left stranded in the alpha quadrant of obsolescence. Engage at will—let's pioneer 
              the final frontier of software, where no challenge has gone before. 🖖
            </p>
          </div>          
        </Container>
      </div>
    </PageTransitionWrapper>
  );
}
