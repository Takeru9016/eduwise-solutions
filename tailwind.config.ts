import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],
  plugins: [tailwindcssAnimate],
  theme: {
    container: {
      center: true,
      padding: {
        "2xl": "6rem",
        DEFAULT: "1rem",
        lg: "4rem",
        sm: "2rem",
        xl: "5rem",
      },
      screens: {
        "2xl": "1400px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        xl: "1280px",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Added animation utility for marquee
        marquee: "marquee 15s linear infinite",
        "scroll-left": "scroll-left 40s linear infinite",
        "scroll-right": "scroll-right 40s linear infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // Original shadcn/ui colors
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        grey: {
          10: "hsl(var(--grey-10))",
          15: "hsl(var(--grey-15))",
          20: "hsl(var(--grey-20))",
          30: "hsl(var(--grey-30))",
          35: "hsl(var(--grey-35))",
          40: "hsl(var(--grey-40))",
          60: "hsl(var(--grey-60))",
          70: "hsl(var(--grey-70))",
        },
        input: "hsl(var(--input))",
        // New color schemes
        light: {
          90: "hsl(var(--light-90))",
          95: "hsl(var(--light-95))",
          97: "hsl(var(--light-97))",
          99: "hsl(var(--light-99))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          50: "hsl(var(--primary-50))",
          70: "hsl(var(--primary-70))",
          75: "hsl(var(--primary-75))",
          80: "hsl(var(--primary-80))",
          90: "hsl(var(--primary-90))",
          95: "hsl(var(--primary-95))",
          97: "hsl(var(--primary-97))",
          99: "hsl(var(--primary-99))",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        sidebar: {
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        vietnam: ["Be Vietnam Pro", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Added keyframes for infinite scroll animation
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "scroll-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      screens: {
        "2xl": "1400px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        xl: "1280px",
        xs: "375px",
      },
    },
  },
} satisfies Config;
