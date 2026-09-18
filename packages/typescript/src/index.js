import { createConfig } from '@metamask/oxlint-config';

const config = createConfig({
  plugins: ['typescript', 'import', 'jsdoc', 'promise'],

  options: {
    typeAware: true,
  },

  rules: {
    'typescript/array-type': 'error',
    'typescript/await-thenable': 'error',
    'typescript/ban-ts-comment': 'error',
    'typescript/consistent-type-assertions': 'error',
    'typescript/consistent-type-definitions': ['error', 'type'],
    'typescript/consistent-type-exports': 'error',
    'typescript/explicit-function-return-type': 'error',
    'typescript/no-array-delete': 'error',
    'typescript/no-base-to-string': 'error',
    'typescript/no-duplicate-enum-values': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-extra-non-null-assertion': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-for-in-array': 'error',
    'typescript/no-meaningless-void-operator': 'error',
    'typescript/no-misused-new': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-namespace': ['error', { allowDefinitionFiles: true }],
    'typescript/no-non-null-asserted-optional-chain': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-this-alias': 'error',
    'typescript/no-unnecessary-boolean-literal-compare': 'error',
    'typescript/no-unnecessary-qualifier': 'error',
    'typescript/no-unnecessary-type-assertion': 'error',
    'typescript/no-unnecessary-type-constraint': 'error',
    'typescript/no-unsafe-argument': 'error',
    'typescript/no-unsafe-assignment': 'error',
    'typescript/no-unsafe-call': 'error',
    'typescript/no-unsafe-declaration-merging': 'error',
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-unsafe-member-access': 'error',
    'typescript/no-unsafe-return': 'error',
    'typescript/no-unsafe-unary-minus': 'error',
    'typescript/no-wrapper-object-types': 'error',
    'typescript/only-throw-error': 'error',
    'typescript/parameter-properties': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-enum-initializers': 'error',
    'typescript/prefer-for-of': 'error',
    'typescript/prefer-function-type': 'error',
    'typescript/prefer-includes': 'error',
    'typescript/prefer-namespace-keyword': 'error',
    'typescript/prefer-nullish-coalescing': 'error',
    'typescript/prefer-optional-chain': 'error',
    'typescript/prefer-promise-reject-errors': [
      'error',
      { allowThrowingUnknown: true },
    ],
    'typescript/prefer-readonly': 'error',
    'typescript/prefer-reduce-type-parameter': 'error',
    'typescript/prefer-string-starts-ends-with': 'error',
    'typescript/promise-function-async': 'error',
    'typescript/restrict-plus-operands': 'error',
    'typescript/restrict-template-expressions': [
      'error',
      {
        allowBoolean: true,
        allowNumber: true,
      },
    ],
    'typescript/switch-exhaustiveness-check': [
      'error',
      {
        considerDefaultExhaustiveForUnions: true,
      },
    ],
    'typescript/triple-slash-reference': 'error',
    'typescript/unbound-method': 'error',
    'typescript/unified-signatures': 'error',

    /* Import plugin rules */

    // TypeScript handles named import validation.
    'import/named': 'off',

    // This rule is too aggressive about combining type and non-type imports,
    // which I'm not sure that we want.
    // But more importantly, the auto-fixer is broken.
    // See here for details on that bug: https://github.com/un-ts/eslint-plugin-import-x/issues/231
    // TODO: Check if this is the case for Oxlint.
    'import/no-duplicates': 'off',

    // Combined with the "verbatimModuleSyntax" tsconfig option, a better option
    // than `typescript/consistent-type-imports`.
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

    /* JSDoc plugin rules */

    // These all conflict with `jsdoc/no-types`.
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-property-type': 'off',
    'jsdoc/require-returns-type': 'off',
    // 'jsdoc/valid-types': 'off',

    /* Promise plugin rules */

    // TypeScript already validates Promise params, no need to validate them
    // twice.
    'promise/valid-params': 'off',
  },
});

export default config;
