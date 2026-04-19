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
  tagline:         'Backend & Infrastructure Engineer',
  careerStartYear: 2004,

  // Homepage bio — {stardate} and {years} tokens computed client-side.
  homepageBioTemplate: "Captain's log, stardate {stardate}: For last {years} years, I've boldly navigated the digital frontier, charting solutions across uncharted sectors—finance's nebulae, justice's asteroid belts, and the bureaucratic wormholes of public service.",

  homepageBioExtra: [
    "Armed with a tricorder of Microsoft tech and a starship engineered from micro-services and Docker containers at warp speed, I've allied with Starfleet's HMPPS to dismantle legacy system Borgs and assimilate innovation. My crew? A cross-functional away team, trained in the Vulcan discipline of clean code and the Klingon art of relentless problem-solving.",
    'Mission priority: To seek out new patterns, elevate civilizations with scalable tech, and ensure no enterprise is left stranded in the alpha quadrant of obsolescence. Engage at will — let\'s pioneer the final frontier of software, where no challenge has gone before. 🖖',
  ],

  bio: "I've spent 20+ years building backend systems that run in places where failure isn't an option — prison service platforms for the Ministry of Justice, payment integrations where every penny has to reconcile, and retail systems processing thousands of transactions a minute at Ocado.\n\nMy day-to-day is C#, .NET, Azure, Docker, and SQL Server. I containerise services, set up CI/CD pipelines, tune slow queries, and build the kind of monitoring that catches problems before anyone has to file a ticket. I've held SC security clearance and I'm comfortable working in regulated environments where compliance and audit trails are part of the job, not an afterthought.\n\nRight now I'm at PDI Technologies, working on real-time enterprise integrations. Before that I was at Ocado Group building Azure-native backend services, and at Unilink delivering software for HMPPS.\n\nI care about writing code that the next person can actually read, deploy, and trust. I'm not chasing the latest framework — I'm interested in things that work reliably at 2am when nobody's watching.",

  sectors: [
    'Distributed Systems',
    'Platform Engineering',
    'FinTech',
    'Justice & Public Service',
    'Microservices',
    'Azure Cloud',
    'DevOps & CI/CD',
    'Retail & E-Commerce',
  ],

  philosophy: 'Build for the next engineer, not just the next deadline.',

  careerTimeline: [
    {
      period: '2024 – Present',
      company: 'PDI Technologies',
      role: 'Backend / Integration Engineer',
      description: 'Real-time enterprise integrations for fuel forecourt systems — pump controllers, site controllers, DOMS and OPT data feeds, POS kiosk systems, payment transactions, and third-party loyalty integrations. Docker, Azure, TeamCity CI/CD.',
    },
    {
      period: '2024',
      company: 'Ocado Group',
      role: 'Backend Engineer',
      description: 'Azure Functions, Service Bus, and data pipelines supporting online retail operations at scale.',
    },
    {
      period: '2020 – 2024',
      company: 'Unilink Software',
      role: 'Software Engineer',
      description: 'Microservices for the prison service (MoJ/HMPPS). Kafka, Jenkins, Docker containerisation of legacy .NET services. SC security cleared.',
    },
    {
      period: '2018 – 2020',
      company: 'IN-SYNC Group',
      role: 'Software Engineer',
      description: 'Payment integrations, Vue.js, RabbitMQ, and Octopus Deploy. FinTech domain.',
    },
  ] satisfies CareerEntry[],

  projectsIntro: "Most of my professional work lives behind firewalls and NDAs — prison systems, payment platforms, and enterprise retail integrations that you'll never see on GitHub. But here are the projects I can talk about, along with some personal work that shows how I think about problems.",

  avatarPath: '/images/_hb-logo.png',
};
