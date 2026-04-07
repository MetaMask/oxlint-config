import { defineConfig } from 'oxfmt';

export default defineConfig({
  // Most of these are defaults, but we specify them for explicitness.
  printWidth: 80,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',

  // Enable JSDoc formatting.
  jsdoc: {
    addDefaultToDescription: true,
    bracketSpacing: false,
    capitalizeDescriptions: true,
    commentLineStrategy: 'keep',
    descriptionTag: false,
    descriptionWithDot: false,
    keepUnparsableExampleIndent: false,
    lineWrappingStyle: 'greedy',
    preferCodeFences: true,
    separateReturnsFromParam: false,
    separateTagGroups: false,
  },

  // Enable sorting of imports.
  sortImports: {
    newlinesBetween: false,
    groups: [
      ['builtin', 'external'],
      { newlinesBetween: true },
      ['internal', 'parent', 'sibling', 'index', 'unknown'],
    ],
  },

  // Enable sorting of `package.json` fields (including `scripts`).
  sortPackageJson: {
    sortScripts: true,
  },
});
