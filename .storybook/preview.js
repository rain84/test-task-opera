import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
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
  viewport: {
    viewports: {
      Mobile: {
        name: 'Mobile (360x720)',
        type: 'mobile',
        styles: {
          width: '360px',
          height: '720px',
        },
      },
    },
  },
}
