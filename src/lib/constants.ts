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
    description: 'Senior backend engineer with 20+ years building distributed systems across finance, justice, and public service.',
  },
  blogs: {
    title: "Blogs | Hammayo's Portfolio",
    description: 'Technical writing on backend systems, architecture, and engineering craft.',
  },
  cv: {
    title: "CV | Hammayo's Portfolio",
    description: "Hammy Babar's professional CV and experience.",
  },
  projects: {
    title: "Projects | Hammayo's Portfolio",
    description: 'Explore my latest projects and open source contributions on GitHub.',
  },
  contact: {
    title: "Contact | Hammayo's Portfolio",
    description: 'Get in touch via GitHub, LinkedIn, or email.',
  },
};
