import { createConfig } from '@metamask/oxlint-config';

const config = createConfig({
  plugins: ['node', 'unicorn'],

  // `eslint-plugin-n` is loaded as a JS plugin to enable rules not yet
  // natively implemented in Oxlint.
  jsPlugins: ['eslint-plugin-n'],

  env: {
    node: true,
  },

  rules: {
    // Possible Errors
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-exports-assign': 'error',
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',

    // Stylistic rules
    'node/callback-return': 'error',
    'node/exports-style': 'error',
    'node/global-require': 'error',
    'node/no-mixed-requires': 'error',
    'node/no-process-env': 'error',
    'node/no-sync': 'error',

    // Unicorn rules
    'unicorn/no-process-exit': 'error',

    // `eslint-plugin-n` rules
    'n/hashbang': 'error',
    'n/no-callback-literal': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-extraneous-import': 'error',
    'n/no-extraneous-require': 'error',
    'n/no-unpublished-bin': 'error',
    'n/no-unpublished-import': 'error',
    'n/no-unpublished-require': 'error',
    'n/no-unsupported-features/es-builtins': 'error',
    'n/no-unsupported-features/node-builtins': 'error',
    'n/prefer-global/buffer': 'error',
    'n/prefer-global/console': 'error',
    'n/prefer-global/process': 'error',
    'n/prefer-global/text-decoder': 'error',
    'n/prefer-global/text-encoder': 'error',
    'n/prefer-global/url': 'error',
    'n/prefer-global/url-search-params': 'error',
    'n/prefer-promises/dns': 'error',
    'n/prefer-promises/fs': 'error',
    'n/process-exit-as-throw': 'error',

    // Enabled in the base config, but this should be allowed in Node.js
    // projects.
    'import/no-nodejs-modules': 'off',
  },
});

export default config;
