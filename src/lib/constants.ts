/*
 * Application-wide constants
 * This file centralises constants used throughout the application
 */

// Site Information
export const SITE_URL = 'https://hammayo.co.uk';

export const SITE = {
  name:        "Hammayo's Portfolio",
  title:       "Hammayo's | Backend Software Engineer",
  description: 'Portfolio site showcasing 20 years of backend engineering across finance, justice, and public service.',
  author:      'Hammayo Babar',
  keywords:    ['backend engineer', 'software developer', '.NET', 'C#', 'Docker', 'Azure', 'microservices', 'HMPPS', 'portfolio', 'hammy', 'HB'],
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
    title: "Hammayo's | Backend Software Engineer",
    description: 'Portfolio site showcasing 20+ years of backend engineering across finance, justice, and public service.',
  },
  about: {
    title: "About | Hammayo's Portfolio",
    description: 'Backend engineer with 20+ years across finance, justice, and retail. C#, .NET, Azure, Docker, SC cleared.',
  },
  blogs: {
    title: "Blogs | Hammayo's Portfolio",
    description: 'Practical writing on .NET, Docker, CI/CD, and engineering in regulated environments.',
  },
  cv: {
    title: "CV | Hammayo's Portfolio",
    description: "Hammy Babar's professional CV and experience.",
  },
  projects: {
    title: "Projects | Hammayo's Portfolio",
    description: "Most of my work lives behind NDAs — prison systems, payment platforms, enterprise integrations. Here's what I can show.",
  },
  contact: {
    title: "Contact | Hammayo's Portfolio",
    description: 'Currently open to backend and DevOps roles. SC cleared. Based in Sutton, open to hybrid and remote across the UK.',
  },
};
