import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

// Animation configurations
const keyframesConfig = {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "fade-in": {
    "0%": { opacity: "0", transform: "translateY(20px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  "fade-in-scale": {
    "0%": { opacity: "0", transform: "scale(0.9)" },
    "100%": { opacity: "1", transform: "scale(1)" },
  },
  "slide-in-right": {
    "0%": { transform: "translateX(-10px)", opacity: "0" },
    "100%": { transform: "translateX(0)", opacity: "1" },
  },
  "slide-in-left": {
    "0%": { transform: "translateX(10px)", opacity: "0" },
    "100%": { transform: "translateX(0)", opacity: "1" },
  },
  "pulse-soft": {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.8" },
  },
  "float": {
    "0%": { 
      transform: "translateY(0px) rotate(0deg) scale(1)",
      filter: "brightness(1)",
    },
    "50%": { 
      transform: "translateY(-5px) rotate(2deg) scale(1.05)",
      filter: "brightness(1.1)",
    },
    "100%": { 
      transform: "translateY(0px) rotate(0deg) scale(1)",
      filter: "brightness(1)",
    }
  },
  "gradient-x": {
    "0%, 100%": {
      "background-position": "200% 0",
      "opacity": "0.5"
    },
    "50%": {
      "background-position": "0% 0",
      "opacity": "0.8"
    }
  },
  "gradient-flow": {
    "0%, 100%": {
      "background-size": "200% 200%",
      "background-position": "0% 0%",
      "transform": "rotate(0deg)"
    },
    "50%": {
      "background-size": "200% 200%",
      "background-position": "100% 100%",
      "transform": "rotate(0deg)"
    },
  }
};

// Animation durations and timings
const animationsConfig = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "fade-in": "fade-in 0.5s ease-out forwards",
  "fade-in-scale": "fade-in-scale 0.5s ease-out forwards",
  "slide-in-right": "slide-in-right 0.3s ease-out forwards",
  "slide-in-left": "slide-in-left 0.3s ease-out forwards",
  "pulse-soft": "pulse-soft 2s ease-in-out infinite",
  "float": "float 3s ease-in-out infinite",
  "gradient-x": "gradient-x 15s ease-in-out infinite",
  "gradient-flow": "gradient-flow 20s ease infinite"
};

// Theme colors
const themeColors = {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
  chart: {
    1: "hsl(var(--chart-1))",
    2: "hsl(var(--chart-2))",
    3: "hsl(var(--chart-3))",
    4: "hsl(var(--chart-4))",
    5: "hsl(var(--chart-5))",
  },
};

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", ...fontFamily.mono],
        sans: ["var(--font-mono)", ...fontFamily.sans],
      },
      colors: themeColors,
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: keyframesConfig,
      animation: animationsConfig,
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'mono-normal': '-0.025em',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }: any) {
      const animationDelays = Object.fromEntries(
        [100, 200, 300, 400, 500, 600, 700, 800].map(delay => [
          `.animate-delay-${delay}`,
          { 'animation-delay': `${delay}ms` }
        ])
      );
      addUtilities(animationDelays, ['responsive', 'hover']);
    },
  ],
};

export default config;
