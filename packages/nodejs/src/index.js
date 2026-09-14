import { createConfig } from '@metamask/oxlint-config';

const config = createConfig({
  plugins: ['node'],

  rules: {
    // Possible Errors
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',

    // Stylistic rules
    'node/callback-return': 'error',
    'node/exports-style': 'error',
    'node/global-require': 'error',
    'node/no-mixed-requires': 'error',
    'node/no-process-env': 'error',
    'node/no-sync': 'error',

    // Enabled in the base config, but this should be allowed in Node.js
    // projects.
    'import/no-nodejs-modules': 'off',
  },
});

export default config;
