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
        // Admin design system fonts (ZeroAbstraction mockup tokens)
        headline: ['Metropolis', 'sans-serif'],
        display: ['Metropolis', 'sans-serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
        label: ['JetBrains Mono', 'monospace'],
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
        // Domain accent colors (public site)
        electronics: { DEFAULT: '#22d3ee', muted: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 0.2)' },
        astrophysics: { DEFAULT: '#a855f7', muted: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.2)' },
        physics: { DEFAULT: '#4ade80', muted: 'rgba(74, 222, 128, 0.1)', border: 'rgba(74, 222, 128, 0.2)' },
        research: { DEFAULT: '#fbbf24', muted: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)' },
        communications: { DEFAULT: '#60a5fa', muted: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.2)' },
        // ── Admin dashboard design-system color tokens (ZeroAbstraction palette) ──
        'on-background': '#e5e2e1',
        'surface-container-high': '#2b2a2a',
        'surface-container-highest': '#353434',
        'surface-container-low': '#1c1b1b',
        'surface-container-lowest': '#0e0e0e',
        'surface-container': '#201f1f',
        'surface-bright': '#3a3939',
        'surface-dim': '#141313',
        'surface-variant': '#353434',
        'surface-tint': '#c9c6c5',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#c4c7c7',
        'inverse-surface': '#e5e2e1',
        'inverse-on-surface': '#313030',
        'primary-container': '#0a0a0a',
        'primary-fixed': '#e5e2e1',
        'primary-fixed-dim': '#c9c6c5',
        'inverse-primary': '#5f5e5e',
        'on-primary': '#313030',
        'on-primary-container': '#7b7979',
        'on-primary-fixed': '#1c1b1b',
        'on-primary-fixed-variant': '#474646',
        'secondary-container': '#48494c',
        'secondary-fixed': '#e2e2e6',
        'secondary-fixed-dim': '#c6c6ca',
        'on-secondary': '#2f3034',
        'on-secondary-container': '#b8b8bc',
        'on-secondary-fixed': '#1a1c1f',
        'on-secondary-fixed-variant': '#45474a',
        'tertiary-container': '#010a1b',
        'tertiary-fixed': '#d8e3fb',
        'tertiary-fixed-dim': '#bcc7de',
        'on-tertiary': '#263143',
        'on-tertiary-container': '#6f7a8f',
        'on-tertiary-fixed': '#111c2d',
        'on-tertiary-fixed-variant': '#3c475a',
        'outline-variant': '#444748',
        'error-container': '#93000a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        DEFAULT: '0.25rem',
        xl: '0.75rem',
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
        entryScale: {
          from: { opacity: '0', transform: 'scale(0.98)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        fadeInRight: {
          from: { opacity: '0', transform: 'translateX(10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Premium motion keyframes
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        slideInFromBottom: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'entry-scale': 'entryScale 200ms ease-out forwards',
        'fade-in-right': 'fadeInRight 0.5s ease forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Premium motion animations
        'float-gentle': 'floatGentle 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'slide-in-bottom': 'slideInFromBottom 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
              backgroundColor: 'transparent',
              borderRadius: '0',
              border: 'none',
              overflow: 'visible',
              padding: '0',
              marginTop: '0',
              marginBottom: '0',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              display: 'inline',
              overflowX: 'visible',
            },
          },
        },
      }),
    },
  },
  plugins: [typography, animate],
};

export default config;
