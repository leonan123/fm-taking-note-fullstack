import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },

      animation: {
        'show-dialog': 'show-dialog 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'hide-dialog': 'hide-dialog 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'overlay-show': 'overlay-show 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'overlay-hide': 'overlay-hide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },

      keyframes: {
        'show-dialog': {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },

        'hide-dialog': {
          '0%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
          '100%': {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
        },

        'overlay-show': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        'overlay-hide': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
