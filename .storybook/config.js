import { configure, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

// Option defaults.
addParameters({
  options: {
    theme: themes.dark,
    name: 'React Vista',
    url: 'https://github.com/pomber/react-vista',
  },
});

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
