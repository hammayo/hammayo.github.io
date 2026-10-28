// content/about.ts
// All about-page and homepage bio content.

export type CareerEntry = {
  period: string;
  company: string;
  role: string;
  description: string;
};

export const about = {
  name:            'Hammayo',
  shortName:       'Hammy',
  tagline:         'Senior Software Engineer · Agentic Engineering',
  careerStartYear: 2001,

  // Homepage bio — {stardate} and {years} tokens computed client-side.
  homepageBioTemplate: "Captain's log, stardate {stardate}: For last {years} years, I've boldly navigated the digital frontier, charting solutions across uncharted sectors—finance's nebulae, justice's asteroid belts, and the bureaucratic wormholes of public service.",

  homepageBioExtra: [
    "Armed with a tricorder of Microsoft tech and a starship engineered from micro-services and Docker containers at warp speed, I've allied with Starfleet's HMPPS to dismantle legacy system Borgs and assimilate innovation. My crew? A cross-functional away team, trained in the Vulcan discipline of clean code and the Klingon art of relentless problem-solving.",
    'Mission priority: To seek out new patterns, elevate civilizations with scalable tech, and ensure no enterprise is left stranded in the alpha quadrant of obsolescence. Engage at will — let\'s pioneer the final frontier of software, where no challenge has gone before. 🖖',
  ],

  bio: "I'm a senior full-stack engineer with 20+ years building production systems in C# and .NET, with front ends in React, Angular and Vue.js. Most of that career has been where a wrong answer costs money or trust: pay-at-pump payments on fuel forecourts, HMRC tax submission, PCI card-payment compliance, and justice-sector platforms for the MoJ and HMPPS. I've held SC security clearance and I'm comfortable in regulated environments where audit trails are part of the job.\n\nI work AI-first. At PDI Technologies, where I'm a Senior Software Engineer II, I built a spec-driven Claude Code workflow, since adopted team-wide for larger pieces of work: the assistant agrees every acceptance criterion before writing a spec, well-specified features run through an agent loop as small, gated stories, and no change is committed without human review.\n\nMy day-to-day is C#, .NET, TypeScript, Azure, Docker and SQL Server.\n\nI care about writing code that the next person can actually read, deploy, and trust. I'm not chasing the latest framework; I'm interested in things that work reliably at 2am when nobody's watching.",

  sectors: [
    'Agentic Engineering',
    'Fuel & Retail Technology',
    'Payments & FinTech',
    'Justice & Public Service',
    'Legacy Modernisation',
    'Event-Driven Systems',
    'Azure Cloud',
    'DevOps & CI/CD',
  ],

  philosophy: 'Build for the next engineer, not just the next deadline.',

  careerTimeline: [
    {
      period: 'Jan 2025 – Present',
      company: 'PDI Technologies',
      role: 'Senior Software Engineer II',
      description: 'Built a spec-driven Claude Code workflow adopted team-wide, and delivered a 27-story Angular feature through a gated agent loop. Built and supported a .NET forecourt service integrating pump controllers, payment terminals, POS tills and back-office systems; designed least-privilege site-staff access across 21 API controllers.',
    },
    {
      period: 'Jun – Dec 2024',
      company: 'Ocado Group',
      role: 'Software Engineer (Contract)',
      description: "Integrated and migrated MiOcado, Ocado's internal employee system, to Clean Architecture on Azure Functions and Service Bus.",
    },
    {
      period: 'Nov 2020 – Feb 2024',
      company: 'Unilink Software',
      role: 'Backend Software Developer',
      description: 'Services for UCase, the microservices platform replacing legacy kiosk and in-cell device software for 70,000+ people in custody across 74 facilities (MoJ/HMPPS). Kafka with a transactional outbox, Docker, 95% unit-test coverage on three owned services. SC cleared.',
    },
    {
      period: 'Aug 2018 – Jul 2020',
      company: 'IN-SYNC Group',
      role: 'Full-Stack Software Developer',
      description: "VAT and Self Assessment submission to HMRC including Making Tax Digital, payment processing and Open Banking integrations over RabbitMQ, and the ASP.NET MVC to Vue.js migration.",
    },
    {
      period: '1996 – 2018',
      company: 'Earlier career',
      role: 'Full-Stack Engineer & Consultant',
      description: 'Context Software (2010–18): PCI-compliance payment service and booking for 300 estate-agency branches. ACL Software (2001–10): technical lead on a property portal with 1M+ hits a week for MoD, Panasonic and TMX. Earlier roles included third-line application support.',
    },
  ] satisfies CareerEntry[],

  projectsIntro: "Most of my professional work lives behind firewalls and NDAs — prison systems, payment platforms, and enterprise retail integrations that you'll never see on GitHub. But here are the projects I can talk about, along with some personal work that shows how I think about problems.",

  avatarPath: '/images/_hb-logo.png',
};
