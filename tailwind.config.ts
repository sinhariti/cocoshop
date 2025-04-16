import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#124E66",
          foreground: "#D3D9D4",
        },
        secondary: {
          DEFAULT: "#2E3944",
          foreground: "#D3D9D4",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#748D92",
          foreground: "#212A31",
        },
        text: {
          primary: "#2E3944",
        },
        accent: {
          DEFAULT: "#748D92",
          foreground: "#212A31",
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
          "1": "#212A31",
          "2": "#2E3944",
          "3": "#124E66",
          "4": "#748D92",
          "5": "#D3D9D4",
        },
        sidebar: {
          DEFAULT: "#212A31",
          foreground: "#212A31",
          primary: "#124E66",
          "primary-foreground": "#D3D9D4",
          accent: "#2E3944",
          "accent-foreground": "#D3D9D4",
          border: "#2E3944",
          ring: "#124E66",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Removed duplicate
}

export default config
