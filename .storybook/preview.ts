import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    backgrounds: {
        values: [
            { name: 'Dark', value: '#333' },
            { name: 'Light', value: '#F7F9F2' },
            { name: 'Blue', value: '#400' },
        ],
        default: 'Light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    initialGlobals: {
        backgrounds: { value: 'light' },
    },
    options: {
        storySort: {
          order: ['Intro', 'Changelog'],
        },
    },
  },
  decorators: [
    () => ({
      template: '<div style="margin: 3em;" data-merieli="dev"><story/></div>',
    }),
  ],
  tags: ['autodocs'],
};


export default preview;
