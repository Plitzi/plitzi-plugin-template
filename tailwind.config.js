const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const { join } = require('path');

module.exports = {
  content: [
    // join(__dirname, "src/**/!(*.stories|*.spec).{js,html}")
    join(__dirname, 'src/**/*.{js,html}')
  ],
  theme: {
    extend: {},
    fontFamily: {
      ...defaultTheme.fontFamily,
      rubik: ['Rubik', 'sans-serif']
    },
    colors: {
      ...defaultTheme.colors({ colors }),
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        50: '',
        100: '',
        200: '',
        300: '',
        400: '',
        500: '',
        600: '',
        700: '',
        800: '',
        900: ''
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addVariant, theme }) => {
      const groups = theme('groups') || [];

      groups.forEach(group => {
        addVariant(`group-${group}-hover`, () => {
          return `:merge(.group-${group}):hover &`;
        });
      });
    })
  ]
};
