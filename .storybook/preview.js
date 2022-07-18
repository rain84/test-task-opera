import {} from '../src/style.sass'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: {
      type: 'code',
    },
  },
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
}
