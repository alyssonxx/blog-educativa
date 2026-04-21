import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ✅ CORES EXATAS DO SITE ORIGINAL
        verde: {
          50: '#f1f8e9',
          100: '#dcedc8',
          200: '#c5e1a5',
          500: '#2e7d32',  // Verde principal
          600: '#25a244',
          700: '#1b5e20',
          800: '#136a1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // ✅ SIMPLES - FUNCIONA SEMPRE
}

export default config