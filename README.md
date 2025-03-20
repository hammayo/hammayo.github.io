# Hammayo's Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

![Home Page](/public/screenshots/home.png)
*Home page featuring title and animated background*

![Projects Page](/public/screenshots/projects.png)
*Projects page showcasing GitHub repositories in cards*

![Dark/Light Mode](/public/screenshots/contact.png)
*Seamless theme switching*

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
git clone https://github.com/hammayo/www-portfolio.git
cd www-portfolio
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
www-portfolio/
├── .github/            # GitHub Actions workflows
├── public/             # Static assets
│   └── icons/          # Favicon and app icons
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── contact/    # Contact page
│   │   ├── projects/   # Projects page
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   └── ui/         # UI components
│   ├── lib/            # Utilities
│   │   ├── constants.ts  # App constants
│   │   ├── env.ts      # Environment variables
│   │   ├── github.ts   # GitHub API client
│   │   ├── logger.ts   # Logging utility
│   │   └── utils.ts    # Utility functions
│   └── providers/      # React context providers
├── .env.local          # Local environment variables
├── next.config.ts      # Next.js configuration
└── tailwind.config.ts  # Tailwind CSS configuration
```

## 📈 Analytics Integration

To add analytics:

1. Create an account with your preferred analytics provider (Google Analytics, Plausible, etc.)
2. Add the tracking code to `/src/app/layout.tsx`



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

Edit the following files to customize your portfolio:

1. **Home Page**: `/src/app/page.tsx` - Update your introduction and hero section
2. **Projects**: Your GitHub repositories are automatically fetched and displayed
3. **Contact Information**: `/src/app/contact/page.tsx` - Update your contact details
4. **Header Links**: `/src/components/header.tsx` - Modify navigation links

### Styling

- **Colors**: Edit the gradient colors in `/src/app/globals.css`
- **Theme**: Modify the theme variables in `/src/app/globals.css`
- **Typography**: Change the font in `/src/app/layout.tsx`



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

