// @ts-check

import { createConfig } from '@metamask/oxlint-config';

const config = createConfig({
  plugins: [],

  categories: {
    correctness: 'allow',
  },

  env: {
    browser: true,
  },

  rules: {},
});

export default config;
