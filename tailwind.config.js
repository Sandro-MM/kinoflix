const plugin = require('tailwindcss/plugin');
const {
  sharedOverride,
  sharedExtend,
  sharedPlugins,
} = require('./common/foundation/resources/client/shared.tailwind');

module.exports = {
  content: [
    './resources/client/**/*.ts*',
    './common/foundation/resources/client/**/*.ts*',
    './common/foundation/resources/views/install/**/*.blade.php',
    './common/foundation/resources/views/domains/**/*.blade.php',
  ],
  darkMode: 'class',
  theme: {
    ...sharedOverride,
    extend: {
      ...sharedExtend,
      aspectRatio: {
        poster: '471 / 707',
        'episode-poster': '1256 / 707',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    // screens: {
    //   sm: '640px',
    //   md: '768px',
    //   lg: '1024px',
    //   xl: '1146px',
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), ...sharedPlugins(plugin)],
};
