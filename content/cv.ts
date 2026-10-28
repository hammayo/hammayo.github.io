// content/cv.ts
// Single source of truth for the CV page. Facts come from the v5 resume.
import { SOCIAL } from '@/lib/constants';

export type SelectedWork = {
  title:    string;
  kind:     'open' | 'employer';
  summary:  string;
  tags:     string[];
  href?:    string;
  hrefLabel?: string;
};

export const cv = {
  linkedIn: SOCIAL.linkedin,
  github:   SOCIAL.github,

  tagline:  'Senior Software Engineer · Agentic Engineering',
  facts:    ['20+ years', 'Previously SC cleared', 'Basingstoke · open to remote and hybrid roles'],

  requestCv: {
    label:   'Request my CV',
    mailto:  `mailto:${SOCIAL.email}?subject=${encodeURIComponent('CV request')}`,
    note:    'I send the full CV on request, so it stays current and my contact details stay off the public web.',
  },

  // Flat list read by the homepage SkillsStrip.
  skills: {
    languages: ['C#', '.NET', 'TypeScript', 'SQL', 'React', 'Angular'],
    platforms: ['Azure', 'Docker', 'GitHub Actions', 'TeamCity'],
    tools:     ['Claude Code', 'PostgreSQL', 'SQL Server', 'Redis', 'RabbitMQ', 'Kafka'],
  },

  skillGroups: [
    {
      label: 'AI-assisted engineering',
      items: ['Claude Code daily', 'Spec/PRD-driven workflows', 'Custom skills', 'Agent loops with gates', 'Deterministic pre-PR checks'],
    },
    {
      label: 'Languages & frameworks',
      items: ['C#', 'TypeScript', 'T-SQL', '.NET 10 / 9 / Framework 4.8', 'ASP.NET Core', 'Dapper', 'EF Core', 'React', 'Next.js', 'Angular', 'Vue.js'],
    },
    {
      label: 'Architecture & design',
      items: ['Microservices', 'Event-driven', 'Clean Architecture', 'DDD', 'SOLID', 'REST API design', 'Legacy modernisation'],
    },
    {
      label: 'Production readiness',
      items: ['xUnit', 'Moq', 'SpecFlow', 'Testcontainers', 'Structured logging', 'Code review', 'Technical specs'],
    },
    {
      label: 'Data & messaging',
      items: ['SQL Server', 'PostgreSQL', 'Redis', 'Kafka', 'RabbitMQ', 'Azure Service Bus'],
    },
    {
      label: 'Cloud & delivery',
      items: ['Azure', 'Docker', 'GitHub Actions', 'TeamCity', 'Azure DevOps', 'Jenkins', 'Octopus Deploy', 'SonarCloud'],
    },
  ],

  selectedWork: [
    {
      title:   'Wallet Transfer',
      kind:    'open',
      summary: 'A money-transfer system in .NET 10 with guardrails modelled on three real-world failures (NATS air traffic control, Post Office Horizon, RBS CA-7). Shared libraries: HMAC audit hash chain, hybrid logical clock, Polly resilience pipeline, and a RabbitMQ transactional outbox, inbox and reliable consumer over Dapper and PostgreSQL, tested with Testcontainers.',
      tags:    ['.NET 10', 'PostgreSQL', 'RabbitMQ', 'Testcontainers'],
    },
    {
      title:   'Tewe Diary',
      kind:    'open',
      summary: 'A movie-diary API built spec-first with Claude Code: JWT identity service, Dapper and PostgreSQL, Testcontainers tests, a GitHub Actions pipeline built to deploy to Azure App Service, and a React front end. Written up as a 14-part series.',
      tags:    ['.NET 10', 'React', 'GitHub Actions', 'Claude Code'],
      href:    '/blogs/building-tewe-diary-part-1-dapper-not-an-orm',
      hrefLabel: 'Read the series',
    },
    {
      title:   'Spec-driven Claude Code workflow (PDI)',
      kind:    'employer',
      summary: 'Built a workflow where the agent agrees every acceptance criterion before writing a spec; adopted team-wide for larger work. Delivered a 27-story Angular feature through a gated agent loop, and cut what the assistant loads each session from 1,122 lines to 380.',
      tags:    ['Claude Code', 'Agent loops', 'Angular'],
      href:    '/series',
      hrefLabel: 'Spec-Driven series',
    },
    {
      title:   'UCase (MoJ / HMPPS)',
      kind:    'employer',
      summary: 'Services for the microservices platform that replaced legacy kiosk and in-cell device software for 70,000+ people in custody across 74 facilities. Kafka with a transactional outbox, v1 and v2 APIs side by side, 95% unit-test coverage on three owned services.',
      tags:    ['C#', 'Kafka', 'SQL Server', 'Docker'],
    },
    {
      title:   'Forecourt service (PDI)',
      kind:    'employer',
      summary: '.NET service integrating pump controllers, outdoor payment terminals, POS tills and back-office systems. Features shipped behind default-off switches and proven on a test rig with real pump hardware; 60+ pull requests into the service, 30+ into six shared libraries.',
      tags:    ['.NET', 'Dapper', 'SQL Server', 'NuGet'],
    },
    {
      title:   'HMRC Making Tax Digital (IN-SYNC)',
      kind:    'employer',
      summary: 'Core platform for submitting VAT returns and Self Assessments to HMRC, plus payment processing, rebates and Open Banking integrations over RabbitMQ.',
      tags:    ['C#', 'RabbitMQ', 'Vue.js'],
    },
  ] satisfies SelectedWork[],

  principles: [
    { title: 'Specification before code', body: 'The assistant agrees every acceptance criterion before a spec is written.' },
    { title: 'Small, gated stories',      body: 'Agent loops run build, lint, test and review gates on every story.' },
    { title: 'Humans commit',             body: 'Agents stage; no change is committed without human review.' },
    { title: 'Trade-offs on paper',       body: 'Options and costs written down so product and engineering leads decide.' },
  ],

  employers: [
    { company: 'PDI Technologies',  role: 'Senior Software Engineer II',  period: 'Jan 2025 – Present' },
    { company: 'Ocado Group',       role: 'Software Engineer (Contract)', period: 'Jun – Dec 2024' },
    { company: 'Unilink Software',  role: 'Backend Software Developer',   period: 'Nov 2020 – Feb 2024' },
    { company: 'IN-SYNC Group',     role: 'Full-Stack Software Developer', period: 'Aug 2018 – Jul 2020' },
    { company: 'Context Software',  role: 'Full-Stack Engineer (Consultant)', period: 'Apr 2010 – Jun 2018' },
    { company: 'ACL Software',      role: 'Full-Stack Software Engineer', period: 'May 2001 – Mar 2010' },
  ],

  education: 'BSc Computer Science, University of Karachi (1994 – 1996)',
};
