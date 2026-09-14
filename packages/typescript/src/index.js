import { createConfig } from '@metamask/oxlint-config';

const config = createConfig({
  plugins: ['typescript'],

  options: {
    typeAware: true,
  },

  rules: {
    // Our rules
    'typescript/array-type': 'error',
    'typescript/ban-ts-comment': 'error',
    'typescript/consistent-type-assertions': 'error',
    'typescript/consistent-type-definitions': ['error', 'type'],
    'typescript/explicit-function-return-type': 'error',
    'typescript/no-array-delete': 'error',
    'typescript/no-duplicate-enum-values': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/no-explicit-any': 'off',
    'typescript/no-extra-non-null-assertion': 'error',
    'typescript/no-misused-new': 'error',
    'typescript/no-namespace': ['error', { allowDefinitionFiles: true }],
    'typescript/no-non-null-asserted-optional-chain': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-this-alias': 'error',
    'typescript/no-unnecessary-type-constraint': 'error',
    'typescript/no-unsafe-declaration-merging': 'error',
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-unsafe-unary-minus': 'error',
    'typescript/no-wrapper-object-types': 'error',
    'typescript/parameter-properties': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-for-of': 'error',
    'typescript/prefer-function-type': 'error',
    'typescript/prefer-namespace-keyword': 'error',
    'typescript/prefer-optional-chain': 'error',
    'typescript/triple-slash-reference': 'error',
    'typescript/unified-signatures': 'error',
    'typescript/no-dupe-class-members': 'error',
    'typescript/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        argsIgnorePattern: '[_]+',
        ignoreRestSiblings: true,
      },
    ],

    // Recommended rules that require type information
    'typescript/no-unsafe-argument': 'off',
    'typescript/no-unsafe-assignment': 'off',
    'typescript/no-unsafe-call': 'off',
    'typescript/no-unsafe-member-access': 'off',
    'typescript/no-unsafe-return': 'off',

    // Recommended rules that we do not want to use
    'typescript/no-duplicate-type-constituents': 'off',
    'typescript/no-redundant-type-constituents': 'off',
    'typescript/no-unsafe-enum-comparison': 'off',
    'typescript/require-await': 'off',

    // Disabled because unnecessary type arguments are sometimes helpful for
    // readability
    'typescript/no-unnecessary-type-arguments': 'off',

    // Our rules that require type information
    'typescript/await-thenable': 'error',
    'typescript/consistent-type-exports': 'error',
    'typescript/no-base-to-string': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-for-in-array': 'error',
    'typescript/no-meaningless-void-operator': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-unnecessary-boolean-literal-compare': 'error',
    'typescript/no-unnecessary-qualifier': 'error',
    'typescript/no-unnecessary-type-assertion': 'error',
    'typescript/prefer-enum-initializers': 'error',
    'typescript/prefer-includes': 'error',
    'typescript/prefer-nullish-coalescing': 'error',
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
    'typescript/unbound-method': 'error',

    'default-param-last': 'off',
    'typescript/default-param-last': 'error',

    'no-array-constructor': 'off',
    'typescript/no-array-constructor': 'error',

    'no-shadow': 'off',
    'typescript/no-shadow': ['error', { builtinGlobals: true }],

    'no-throw-literal': 'off',
    'typescript/only-throw-error': 'error',

    'typescript/no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],

    'no-use-before-define': 'off',
    'typescript/no-use-before-define': ['error', { functions: false }],

    'no-useless-constructor': 'off',
    'typescript/no-useless-constructor': 'error',

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

    // TypeScript already validates Promise params, no need to validate them twice
    'promise/valid-params': 'off',
  },
});

export default config;
