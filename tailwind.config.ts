import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bebas Neue', 'Impact', 'Arial Black', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Club palette (deep blues/purples/black)
        club: {
          bg: 'hsl(220, 25%, 8%)',
          surface: 'hsl(220, 25%, 12%)',
          text: 'hsl(220, 10%, 90%)',
          accent: 'hsl(260, 80%, 60%)',
          glow: 'hsl(260, 80%, 60%)',
        },
        // Sunset palette (warm oranges/browns/golds)
        sunset: {
          bg: 'hsl(20, 15%, 8%)',
          surface: 'hsl(20, 15%, 12%)',
          text: 'hsl(20, 10%, 90%)',
          accent: 'hsl(30, 80%, 60%)',
          glow: 'hsl(30, 80%, 60%)',
        },
        // CSS variable colors for theme switching
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        accent: 'var(--accent)',
        glow: 'var(--glow)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
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
        glow: {
          '0%': { boxShadow: '0 0 5px var(--glow)' },
          '100%': { boxShadow: '0 0 20px var(--glow), 0 0 30px var(--glow)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
