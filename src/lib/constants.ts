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
