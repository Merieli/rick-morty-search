import { create } from '@storybook/theming/create';
export const themeDark = create({
    base: 'dark',
    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',

    brandTitle: 'My custom Storybook - Dark',
    brandUrl: 'https://example.com',
    brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
    brandTarget: '_self',

    //
    colorPrimary: '#6272a4',
    colorSecondary: '#bd93f9',

    // UI
    appBg: '#282a36',
    appContentBg: '#44475a',
    appPreviewBg: '#282a36',
    appBorderColor: '#6272a4',
    appBorderRadius: 4,

    // Text colors
    textColor: '#f8f8f2',
    textInverseColor: '#282a36',

    // Toolbar default and active colors
    barTextColor: '#f8f8f2',
    barSelectedColor: '#ff79c6',
    barHoverColor: '#bd93f9', // Adjusted to a lighter purple
    barBg: '#44475a',

    // Form colors
    inputBg: '#44475a',
    inputBorder: '#6272a4',
    inputTextColor: '#f8f8f2',
    inputBorderRadius: 2,
  });
