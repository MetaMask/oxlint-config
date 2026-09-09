// @ts-check

import { createConfig } from '@metamask/oxlint-config';

const config = createConfig({
  plugins: [],

  categories: {
    correctness: 'allow',
  },

  env: {
    commonjs: true,
  },

  rules: {
    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
      },
    ],
  },
});

export default config;
