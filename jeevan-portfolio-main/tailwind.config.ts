import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
         'xl': '1200px',
         '2xl': '1200px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': '1.5rem',
         '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
         'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
         'premium-lg': '0 35px 60px -15px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 40px -10px hsl(var(--primary) / 0.3)',
         'glow-lg': '0 0 60px -15px hsl(var(--primary) / 0.4)',
         'inner-glow': 'inset 0 2px 4px 0 hsl(var(--primary) / 0.06)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in-up': {
           '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
           '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
           '50%': { transform: 'translateY(-15px)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
           '50%': { opacity: '0.6' }
         },
         'morph': {
           '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
           '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' }
         },
         'rotate-slow': {
           '0%': { transform: 'rotate(0deg)' },
           '100%': { transform: 'rotate(360deg)' }
         },
         'levitate': {
           '0%, 100%': { transform: 'translateY(0) scale(1)' },
           '50%': { transform: 'translateY(-8px) scale(1.02)' }
         },
         'scale-in': {
           '0%': { opacity: '0', transform: 'scale(0.95)' },
           '100%': { opacity: '1', transform: 'scale(1)' }
         },
         'glow-pulse': {
           '0%, 100%': { boxShadow: '0 0 20px 0 hsl(var(--primary) / 0.2)' },
           '50%': { boxShadow: '0 0 40px 10px hsl(var(--primary) / 0.4)' }
         },
         'counter': {
           '0%': { opacity: '0', transform: 'translateY(10px)' },
           '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
         'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
         'slide-up': 'slide-up 0.6s ease-out',
         'float': 'float 6s ease-in-out infinite',
         'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
         'scale-in': 'scale-in 0.5s ease-out',
         'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
         'counter': 'counter 0.5s ease-out',
         'morph': 'morph 8s ease-in-out infinite',
         'rotate-slow': 'rotate-slow 20s linear infinite',
         'levitate': 'levitate 4s ease-in-out infinite'
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
         '26': '6.5rem',
         '30': '7.5rem',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
