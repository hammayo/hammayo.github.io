/*
 * Application-wide constants
 * This file centralizes constants used throughout the application
 */

// Site Information
export const SITE = {
  name: "Hammayo's Portfolio",
  title: "Hammayo's | Backend Software Engineer",
  description: "Portfolio site showcasing dev projects.",
  author: "Hammayo Babar",
  keywords: [
    "backend engineer", 
    "software developer", 
    "development", "portfolio", 
    "hammy", "HB"],
};

// Social links and contact information
export const SOCIAL = {
  github: "https://github.com/hammayo",
  linkedin: "https://linkedin.com/in/hammayo",
  email: "hammy@hammayo.co.uk",
};

// Navigation items
export const NAVIGATION = {
  main: [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],
};

// Theme configuration
export const THEME = {
  defaultTheme: "dark" as const,
  lightThemeColor: "#ffffff",
  darkThemeColor: "#000000",
};

// API endpoints
export const API = {
  github: "https://api.github.com",
}; 