// content/about.ts
// All about-page and homepage bio content.
// Replace every TODO comment before merging to main.

export const about = {
  name:            'Hammayo Babar',     // Full name — desktop
  shortName:       'Hammy Babar',       // Short name — mobile (below md breakpoint)
  tagline:         'Senior Backend Engineer',
  careerStartYear: 2004,                // Years of experience = currentYear - careerStartYear

  // Homepage bio — first paragraph uses {stardate} and {years} tokens.
  // {stardate} = YYYYMM.DD computed client-side daily.
  // {years}    = currentYear - careerStartYear, updates each Jan 1.
  homepageBioTemplate: "Captain's log, stardate {stardate}: For last {years} years, I've boldly navigated the digital frontier, charting solutions across uncharted sectors—finance's nebulae, justice's asteroid belts, and the bureaucratic wormholes of public service.",

  // Additional static paragraphs shown below the template paragraph on the homepage.
  homepageBioExtra: [
    "Armed with a tricorder of Microsoft tech and a starship engineered from micro-services and Docker containers at warp speed, I've allied with Starfleet's HMPPS to dismantle legacy system Borgs and assimilate innovation. My crew? A cross-functional away team, trained in the Vulcan discipline of clean code and the Klingon art of relentless problem-solving.",
    'Mission priority: To seek out new patterns, elevate civilizations with scalable tech, and ensure no enterprise is left stranded in the alpha quadrant of obsolescence. Engage at will — let\'s pioneer the final frontier of software, where no challenge has gone before. 🖖',
  ],

  // /about page — longer professional bio. Replace TODO before merging.
  bio: 'TODO: Replace with your professional bio. A few sentences about your background, the domains you have worked in, and what drives you.',

  sectors:   ['Distributed Systems', 'Platform Engineering', 'FinTech', 'Justice & Public Service', 'Microservices'],
  philosophy: 'Build for the next engineer, not just the next deadline.',

  // next/image src — prepend basePath in the component.
  // Falls back to /_hb-logo.png if avatar.jpg is absent.
  avatarPath: '/images/avatar.jpg',
};
