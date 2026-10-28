/*
 * Application-wide constants
 * This file centralises constants used throughout the application
 */

// Site Information
export const SITE_URL = 'https://hammayo.co.uk';

export const SITE = {
  name:        "Hammayo's Portfolio",
  title:       "Hammayo's | Senior Software Engineer",
  description: '20+ years of C# and .NET engineering across finance, justice, and retail — now writing about building software with AI, properly.',
  author:      'Hammy Babar',
  keywords:    [
    // Personal brand
    'Hammy Babar', 'Hammayo Babar', 'Hammayo',
    // Recruiter signals
    'SC cleared engineer', 'senior software engineer UK', 'agentic engineering',
    'remote software engineer UK', 'Basingstoke', 'hire senior software engineer',
    // Technical stack
    'C#', '.NET', 'Azure', 'Docker', 'microservices', 'CI/CD',
    // AI-assisted development
    'AI-assisted development', 'Claude Code', 'spec-driven development',
    'AI developer workflow', 'AI coding for experienced engineers',
    // Domain experience
    'HMPPS', 'MoJ', 'fintech', 'payment systems',
    // General
    'senior software engineer', 'portfolio',
  ],
};

// Social links and contact information
export const SOCIAL = {
  github:   'https://github.com/hammayo',
  linkedin: 'https://linkedin.com/in/hammayo',
  email:    'hammy@hammayo.co.uk',
};

// Theme configuration
export const THEME = {
  defaultTheme:    'dark' as const,
  lightThemeColor: '#ffffff',
  darkThemeColor:  '#000000',
};

// API endpoints
export const API = {
  github: 'https://api.github.com',
};

// Site launch year — used by footer copyright range
export const SITE_LAUNCH_YEAR = 2024;

// Per-page SEO metadata — all page metadata exports import from here
export const PAGE_META = {
  home: {
    title:       "Hammayo's | Senior Software Engineer",
    description: '20+ years of C# and .NET engineering across finance, justice, and retail — now writing about building software with AI, properly.',
  },
  about: {
    title:       "About | Hammayo's Portfolio",
    description: 'Senior software engineer with 20+ years across finance, justice, and retail. C#, .NET, Azure, agentic engineering with Claude Code. Previously SC cleared. Basingstoke — open to remote and hybrid roles.',
  },
  blogs: {
    title:       "Blogs | Hammayo's Portfolio",
    description: 'Practical writing on .NET, Docker, CI/CD, and engineering in regulated environments.',
  },
  cv: {
    title:       "CV | Hammayo's Portfolio",
    description: "Selected work, stack and how I work: Senior Software Engineer, 20+ years in C# and .NET, agentic engineering with Claude Code. SC cleared. CV on request.",
  },
  projects: {
    title:       "Projects | Hammayo's Portfolio",
    description: "Most of my work lives behind NDAs — prison systems, payment platforms, enterprise integrations. Here's what I can show.",
  },
  contact: {
    title:       "Contact | Hammayo's Portfolio",
    description: 'Open to senior software engineering roles: C#, .NET, agentic engineering with Claude Code. Previously SC cleared. Based in Basingstoke, covering Berkshire and London. Open to remote and hybrid roles.',
  },
  series: {
    title:       "Spec-Driven | Hammayo's Portfolio",
    description: 'Spec-Driven: AI development that actually ships. A series on using AI coding tools with twenty years of engineering judgement.',
  },
  services: {
    title:       "Services | Hammayo's Portfolio",
    description: 'Small systems built properly, websites built and maintained, and AI-workflow consulting — from an SC-cleared engineer with 20+ years across finance, justice, and retail.',
  },
};
