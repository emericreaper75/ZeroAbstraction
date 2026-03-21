import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-ibm-plex-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'Menlo', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
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
  plugins: [typography],
};

export default config;
