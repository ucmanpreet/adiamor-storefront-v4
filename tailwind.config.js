/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./components/common/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./assets/css/main.css",
    "./assets/**/*.svg",
    "./mixin/**/*.js",
    "./utils/**/*.js",
    "./static/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
      },
      typography: () => ({
        white: {
          css: {
            '--tw-prose-body': 'var(--color-white)',
          }
        },
      }),
      fontFamily:{
        sans: ['Outfit', 'sans-serif'],
        tangerine: ['Tangerine', 'sans-serif'],
        'gill-sans': ['gill-sans-nova', 'sans-serif'],
      },
      colors: {
        'dim-primary': '#F0F8FF',
        'primary': '#306499',
        // 'primary': '#1e3a8a',
        'reddish-orange': '#b22100',
        'custom-green': '#1e7b1e',
        'gray-black': '#333333',
      },
      width: {
        '17': '4.625rem',
        '18': '4.688rem'
      },
      height: {
        '17': '4.625rem',
        '18': '4.688rem'
      },
      letterSpacing: {
        'widest-lg': '0.0625rem',
        'widest-xl': '0.125rem',
      },
      backgroundPosition: {
        'left-3': 'left -3.13rem',
        'center-3': 'center -3.13rem',
        'right-3': 'right -3.13rem'
      },
      maxWidth: {
        '9xl': '96.375rem',
      },
      fontSize: {
        'xxs': '0.625rem',
        '2xxl': '28px'
      },
      opacity: {
        7: '0.07',
        11: '0.11',
      },
      zIndex: {
        '60': '60',
        '65': '65',
      },
      boxShadow: {
        'banner': '0 0 transparent, 0 0 transparent, 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, .6)',
      },
      maxWidth: {
        '8xl': '96rem',
        '9xl': '120rem',
      },
      textShadow: {
        custom: '.5px 2px 3px #ccc, 0 0 0 #333, .5px 2px 3px #ccc',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

    // custom text-shadow plugin
    function ({ addUtilities, addBase, theme }) {
      const newUtilities = {};
      const shadows = theme('textShadow');

      for (const key in shadows) {
        newUtilities[`.text-shadow-${key}`] = {
          textShadow: shadows[key],
        };
      }

      addUtilities(newUtilities, ['responsive', 'hover']);

      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });

      addBase({
        '@keyframes shimmer': theme('keyframes.shimmer'),
      });

      addUtilities({
        '.skeleton-shimmer': {
          background: `linear-gradient(90deg, ${theme('colors.gray.200')} 25%, ${theme('colors.gray.100')} 50%, ${theme('colors.gray.200')} 75%)`,
          backgroundSize: '200% 100%',
          animation: theme('animation.shimmer'),
        },
      });
    },
  ],
}