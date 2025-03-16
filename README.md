# Hammayo's Portfolio Site

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS featuring a sleek design with glassmorphic UI elements and dynamic GitHub repository integration.

## 🌟 Features

- **Modern UI Design**: Glassmorphic elements, subtle animations, and responsive layout
- **Dynamic Theme Switching**: Seamless light/dark mode transitions
- **GitHub Integration**: Real-time repository fetching to showcase your latest projects
- **Blazing Fast Performance**: Built with Next.js 15 and optimized for speed
- **SEO Optimized**: Proper metadata and structured data for better search engine visibility
- **Responsive Design**: Perfect viewing experience on all devices from mobile to desktop
- **Type-Safe Code**: Written in TypeScript for better developer experience and fewer bugs
- **Custom 404 Page**: Stylish error page that matches the site's design language


## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Bun](https://bun.sh/) (recommended) or npm/yarn
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/hammayo/portfolio.git
cd portfolio
```

2. **Install dependencies**

With Bun (recommended for faster installation):
```bash
bun install
```

Or with npm:
```bash
npm install
```

3. **Start the development server**

```bash
bun run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## 🛠️ Environment Configuration

Create a `.env.local` file in the root directory with the following variables (optional for enhanced GitHub API features):

```
# GitHub Personal Access Token for increased API rate limits (optional)
GITHUB_ACCESS_TOKEN=your_github_token_here
```

## 📂 Project Structure

```
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── ui/         # UI components (buttons, cards, etc.)
│   │   └── ...         # Feature components
│   ├── lib/            # Utility functions and API clients
│   ├── providers/      # Context providers
│   └── styles/         # Global styles
├── .env.local          # Environment variables (create this file)
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🔧 Customisation

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


## 📱 Progressive Web App (PWA)

This website can be configured as a PWA by:

1. Adding a web manifest
2. Configuring service workers
3. Setting proper icons and splash screens

## 🚢 Deployment

### Build for Production

```bash
bun run build
```

### Start Production Server

```bash
bun run start
```

### Deploy to Hosting Platforms

The site is optimized for deployment on:

- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS Amplify
- Any static hosting

## 🧪 Testing

```bash
bun run test
```

## 📈 Analytics Integration

To add analytics:

1. Create an account with your preferred analytics provider (Google Analytics, Plausible, etc.)
2. Add the tracking code to `/src/app/layout.tsx`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
