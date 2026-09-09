import { describe, it, expect } from 'vitest';

import { createConfig } from './utils.js';

describe('createConfig', () => {
  it('returns the same config if there are no extends', () => {
    const config = { rules: { 'no-console': 'error' } };
    expect(createConfig(config)).toStrictEqual(config);
  });

  it('extends a single config', () => {
    const baseConfig = { rules: { 'no-console': 'error' } };
    const extension = { extends: baseConfig, rules: { 'no-alert': 'warn' } };

    const expectedConfig = {
      rules: {
        'no-console': 'error',
        'no-alert': 'warn',
      },
    };

    expect(createConfig(extension)).toStrictEqual(expectedConfig);
  });

  it('extends multiple configs', () => {
    const extension = {
      extends: [
        {
          plugins: ['foo'],
          rules: {
            'no-foo': 'error',
          },
        },
        {
          plugins: ['bar'],
          rules: {
            'no-bar': 'error',
            'no-foo': 'warn',
          },
        },
      ],
      rules: { 'no-debugger': 'error' },
    };

    expect(createConfig(extension)).toStrictEqual({
      plugins: ['foo', 'bar'],
      rules: {
        'no-foo': 'warn',
        'no-bar': 'error',
        'no-debugger': 'error',
      },
    });
  });

  it('removes duplicate plugins when extending multiple configs', () => {
    const extension = {
      extends: [
        {
          plugins: ['foo', 'bar'],
          rules: {
            'no-foo': 'error',
          },
        },
        {
          plugins: ['bar', 'baz'],
          rules: {
            'no-bar': 'error',
          },
        },
      ],
    };

    expect(createConfig(extension)).toStrictEqual({
      plugins: ['foo', 'bar', 'baz'],
      rules: {
        'no-foo': 'error',
        'no-bar': 'error',
      },
    });
  });

  it('resolves extends inside overrides', () => {
    const typescriptConfig = {
      plugins: ['typescript'],
      rules: { '@typescript-eslint/no-explicit-any': 'error' },
    };

    const extension = {
      rules: { 'no-console': 'error' },
      overrides: [
        {
          files: ['**/*.ts'],
          extends: typescriptConfig,
          rules: { 'no-debugger': 'warn' },
        },
      ],
    };

    expect(createConfig(extension)).toStrictEqual({
      rules: { 'no-console': 'error' },
      overrides: [
        {
          files: ['**/*.ts'],
          plugins: ['typescript'],
          rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            'no-debugger': 'warn',
          },
        },
      ],
    });
  });

  it('resolves extends inside overrides of a base config', () => {
    const typescriptConfig = {
      plugins: ['typescript'],
      rules: { '@typescript-eslint/no-explicit-any': 'error' },
    };

    const baseConfig = {
      rules: { 'no-console': 'error' },
      overrides: [
        {
          files: ['**/*.ts'],
          extends: typescriptConfig,
        },
      ],
    };

    expect(createConfig({ extends: baseConfig })).toStrictEqual({
      rules: { 'no-console': 'error' },
      overrides: [
        {
          files: ['**/*.ts'],
          plugins: ['typescript'],
          rules: { '@typescript-eslint/no-explicit-any': 'error' },
        },
      ],
    });
  });

  it('handles nested extends', () => {
    const extension = {
      extends: [
        {
          plugins: ['foo'],
          rules: {
            'no-foo': 'error',
          },
        },
        {
          extends: {
            plugins: ['bar'],
            rules: {
              'no-bar': 'error',
            },
          },
          rules: {
            'no-baz': 'warn',
          },
        },
      ],
      rules: { 'no-debugger': 'error' },
    };

    expect(createConfig(extension)).toStrictEqual({
      plugins: ['foo', 'bar'],
      rules: {
        'no-foo': 'error',
        'no-bar': 'error',
        'no-baz': 'warn',
        'no-debugger': 'error',
      },
    });
  });
});
