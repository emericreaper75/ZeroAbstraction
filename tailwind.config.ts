import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-ibm-plex-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'IBM Plex Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Domain accent colors
        electronics: { DEFAULT: '#22d3ee', muted: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 0.2)' },
        astrophysics: { DEFAULT: '#a855f7', muted: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.2)' },
        physics: { DEFAULT: '#4ade80', muted: 'rgba(74, 222, 128, 0.1)', border: 'rgba(74, 222, 128, 0.2)' },
        research: { DEFAULT: '#fbbf24', muted: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.15)',
        'glow-violet': '0 0 40px rgba(168, 85, 247, 0.15)',
        'glow-emerald': '0 0 40px rgba(74, 222, 128, 0.15)',
        'glow-amber': '0 0 40px rgba(251, 191, 36, 0.15)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      maxWidth: {
        prose: '720px',
        'prose-wide': '900px',
      },
      typography: (theme: (arg: string) => string) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.neutral.300'),
            '--tw-prose-headings': theme('colors.neutral.100'),
            '--tw-prose-lead': theme('colors.neutral.400'),
            '--tw-prose-links': theme('colors.sky.400'),
            '--tw-prose-bold': theme('colors.neutral.100'),
            '--tw-prose-counters': theme('colors.neutral.400'),
            '--tw-prose-bullets': theme('colors.neutral.500'),
            '--tw-prose-hr': theme('colors.neutral.700'),
            '--tw-prose-quotes': theme('colors.neutral.300'),
            '--tw-prose-quote-borders': theme('colors.neutral.600'),
            '--tw-prose-captions': theme('colors.neutral.500'),
            '--tw-prose-code': theme('colors.sky.300'),
            '--tw-prose-pre-code': theme('colors.neutral.100'),
            '--tw-prose-pre-bg': 'hsl(220 16% 10%)',
            '--tw-prose-th-borders': theme('colors.neutral.700'),
            '--tw-prose-td-borders': theme('colors.neutral.800'),
            maxWidth: 'none',
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.serif'),
              scrollMarginTop: '5rem',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              fontFamily: theme('fontFamily.mono'),
              fontSize: '0.875em',
              backgroundColor: 'hsl(220 16% 12%)',
              padding: '0.15em 0.4em',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: 'hsl(220 16% 10%)',
              borderRadius: '0.5rem',
              border: '1px solid hsl(220 16% 18%)',
              overflow: 'hidden',
              padding: '0',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '1rem 1.25rem',
              display: 'block',
              overflowX: 'auto',
            },
          },
        },
      }),
    },
  },
  plugins: [typography, animate],
};

export default config;
