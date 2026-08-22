/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'obsidian': '#030303',
        'obsidian-light': '#0a0a0a',
        'obsidian-card': '#0d0d0d',
        'obsidian-border': '#1a1a1a',
        'brand-blue': '#1A3580',
        'brand-blue-light': '#2548A8',
        'brand-blue-dark': '#0F2260',
        'brand-orange': '#F5941E',
        'brand-orange-glow': '#F5941E33',
        'brand-orange-deep': '#D17A10',
        'brand-orange-muted': '#F5941E1A',
      },
      fontFamily: {
        display: ['"Archivo"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'orange-sm': '0 0 10px #F5941E20, 0 0 20px #F5941E10',
        'orange-md': '0 0 20px #F5941E30, 0 0 40px #F5941E15',
        'orange-lg': '0 0 30px #F5941E40, 0 0 60px #F5941E20, 0 0 100px #F5941E10',
        'orange-glow': '0 0 40px #F5941E50, 0 0 80px #F5941E25, inset 0 0 60px #F5941E08',
      },
      animation: {
        'pulse-orange': 'pulseOrange 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 20px #F5941E20' },
          '50%': { boxShadow: '0 0 40px #F5941E40, 0 0 80px #F5941E20' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
