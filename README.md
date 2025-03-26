[![Build](https://github.com/hammayo/hammayo.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/hammayo/hammayo.github.io/actions/workflows/deploy.yml) [![Version](https://img.shields.io/github/package-json/v/hammayo/hammayo.github.io)](https://github.com/hammayo/hammayo.github.io/releases) [![Updated](https://img.shields.io/github/last-commit/hammayo/hammayo.github.io?logo=github&label=last%20update)](https://github.com/hammayo/hammayo.github.io/commits)

# Hammayo

>
> A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.
>
> https://hammayo.github.io/ 
>

## Features

- 🚀 Built with Next.js 15
- 🔍 SEO optimized
- 📱 Fully responsive
- 🎨 Dark and light mode
- 💨 Fast and lightweight
- ⚡ Server-side rendering
- 🧠 Type-safe with TypeScript
- 🛠️ Error boundary for graceful error handling
- 📊 Centralized environment variable management
- 🔄 Clean code architecture
- 📝 Comprehensive documentation

## 🚀 Getting Started

### Prerequisites
- Git
- Node.js 18+
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hammayo/hammayo.github.io.git
cd hammayo.github.io
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

3. Set up environment variables:
- Copy `.env.local.example` to `.env.local`
- Fill in the necessary environment variables

### Development

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application for production:

```bash
# Using npm
npx serve build     
npm run build

# Using yarn
yarn build

# Using bun
bun run build
```

### Running in Production

Start the production server:

```bash
# Using npm
npm run start

# Using yarn
yarn start

# Using bun
bun start
```

## 🛠️ Deployment

### GitHub Pages

The project is configured for easy deployment to GitHub Pages using GitHub Actions. Simply push to the main branch to trigger a deployment.

### Vercel

For deployment to Vercel, connect your GitHub repository to Vercel for automatic deployment.

## 📂 Project Structure

```
hammayo.github.io/
├── .github/           # GitHub Actions workflows
├── .vscode/           # VS Code configuration
│   └── launch.json    # Debugging configuration
├── public/            # Static assets
│   ├── icons/         # Favicon and app icons
│   └── screenshots/   # README screenshots
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── contact/   # Contact page
│   │   ├── projects/  # Projects page
│   │   ├── layout.tsx # Root layout
│   │   └── page.tsx   # Home page
│   ├── components/    # React components
│   │   ├── ui/        # UI components
│   │   └── project-card.tsx  # Project specific components
│   ├── lib/           # Utilities
│   │   ├── constants.ts # App constants
│   │   ├── env.ts     # Environment variables
│   │   ├── github.ts  # GitHub API client
│   │   ├── logger.ts  # Logging utility
│   │   └── utils.ts   # Utility functions
│   └── providers/     # React context providers
├── .env.local         # Local environment variables
├── .eslintrc.js      # ESLint configuration
├── .eslintrc.json    # Additional ESLint rules
├── bun.lock          # Bun lock file
├── components.json   # shadcn/ui configuration
├── netlify.toml     # Netlify configuration
├── next.config.ts   # Next.js configuration
├── package.json     # Project dependencies
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json    # TypeScript configuration
```

## 🔧 Configuration

### Environment Variables

The application uses type-safe environment variables with Zod validation. Create a `.env.local` file with the following variables:

```bash
# Next.js
NODE_ENV=development
NEXT_PUBLIC_BASE_PATH=

# GitHub (for GitHub Pages deployment)
GITHUB_ACTIONS=
GITHUB_REPOSITORY=

# Analytics (optional)
GA_MEASUREMENT_ID=G-xxxxxxxx
```

Environment variables are managed in `src/lib/env.ts` with runtime validation:

```typescript
const envSchema = z.object({
  // Next.js specific
  NODE_ENV: z.enum(["development", "production", "test"])
    .optional()
    .default("development"),
  
  // GitHub specific
  GITHUB_ACTIONS: z.string().optional(),
  GITHUB_REPOSITORY: z.string().optional(),
  
  // Analytics
  GA_MEASUREMENT_ID: z.string().optional(),
});
```

*NOTE*: For GitHub Actions deployment, the following environment variables are automatically set in `.github/workflows/deploy.yml`:
```yaml
env:
  NODE_ENV: production
  NEXT_PUBLIC_BASE_PATH: ${{ github.event.repository.name }}
```


### Base Path Configuration

The application automatically configures base paths for different environments:

- **Development**: No base path
- **GitHub Pages**: Uses repository name as base path
- **Production**: Configurable via environment variables

Base path logic is handled in `src/lib/env.ts`:

```typescript
export const isGithubActions = Boolean(env.GITHUB_ACTIONS);
export const repo = env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || '';
export const basePath = isGithubActions ? `/${repo}` : '';
export const assetPrefix = isGithubActions ? `/${repo}/` : '';
```

### Configuration Files

- **next.config.ts**: Next.js configuration including image optimization and base path settings
- **tailwind.config.ts**: Tailwind CSS theme and plugin configuration
- **components.json**: shadcn/ui component configuration
- **tsconfig.json**: TypeScript compiler options
- **postcss.config.mjs**: PostCSS plugins configuration
- **eslintrc.js**: ESLint rules and TypeScript integration
- **netlify.toml**: Netlify deployment configuration

### Constants

Application-wide constants are centralized in `src/lib/constants.ts`:

```typescript
export const SITE = {
  name: "Hammayo's Portfolio",
  title: "Hammayo's | Backend Software Engineer",
  description: "Portfolio site showcasing dev projects.",
  // ...
};

export const SOCIAL = {
  github: "https://github.com/hammayo",
  linkedin: "https://linkedin.com/in/hammayo",
  email: "hammy@hammayo.co.uk",
};

export const THEME = {
  defaultTheme: "dark",
  lightThemeColor: "#ffffff",
  darkThemeColor: "#000000",
};
```

## 🔧 Best Practices

- **Type Safety**: Comprehensive TypeScript usage for type safety
- **Environment Variable Management**: Centralized environment variable management with runtime validation
- **Error Handling**: Comprehensive error boundary implementation
- **Logging**: Structured logging system
- **Code Organization**: Clear separation of concerns
- **Configuration Management**: Centralized constants and configuration
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimization**: Metadata and semantic HTML
- **Performance Optimization**: Efficient bundle size and loading strategies
- **Accessibility**: ARIA attributes and semantic HTML

### Personal Information

Edit the following files to customize portfolio:

1. **Home Page**: `/src/app/page.tsx` - Update introduction and hero section
2. **Projects**: GitHub repositories are automatically fetched and displayed
3. **Contact Information**: `/src/app/contact/page.tsx` - Update contact details
4. **Header Links**: `/src/components/header.tsx` - Modify navigation links

### Styling

- **Colors**: Edit the gradient colors in `/src/app/globals.css`
- **Theme**: Modify the theme variables in `/src/app/globals.css`
- **Typography**: Change the font in `/src/app/layout.tsx`

## 📷 Screenshots

![Home Page](/public/screenshots/home.png)

![Dark/Light Mode](/public/screenshots/contact.png)


## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

