import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
      },
      gridTemplateColumns: {
        '7': 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
} satisfies Config
