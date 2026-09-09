import deepmerge from 'deepmerge';

/**
 * @typedef {import('oxlint').OxlintConfig} OxlintConfig
 */

/**
 * @typedef {import('eslint').Linter.Config} Config
 *
 * @typedef {Config & { extends?: Config | Config[] | Config[][] }} ConfigWithExtends
 */

/**
 * Get an array from a value. If the value is already an array, it is returned
 * as is. Otherwise, the value is wrapped in an array.
 *
 * @template Type
 * @param {Type | Type[]} value - The value to convert to an array.
 * @returns {Type[]} The value as an array.
 */
export function getArray(value) {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

/**
 * Create a config object that extends other configs.
 *
 * This function handles merging multiple configs together specified in the
 * `extends` property of the input config. It recursively resolves any nested
 * `extends` properties in the base configs as well. Oxlint by default only
 * merges the `rules` and `plugins` properties of the configs, but this function
 * can be used to merge any properties of the configs.
 *
 * @example <caption>Extending a single config</caption>
 *   import { createConfig } from '@metamask/oxlint-config';
 *   import typescript from '@metamask/oxlint-config-typescript';
 *
 *   const configs = createConfig({
 *     extends: typescript,
 *   });
 *
 *   export default configs;
 *
 * @example <caption>Extending multiple configs</caption>
 *   import { createConfig } from '@metamask/oxlint-config';
 *   import typescript from '@metamask/oxlint-config-typescript';
 *   import nodejs from '@metamask/oxlint-config-nodejs';
 *
 *   const configs = createConfig({
 *     extends: [typescript, nodejs],
 *   });
 *
 *   export default configs;
 *
 * @param {OxlintConfig} config - The config object to create, which may include
 *   an `extends` property that specifies one or more base configs to extend.
 * @returns {Omit<OxlintConfig, "extends">} A single config object with all the
 *   extended configs merged in.
 */
export function createConfig(config) {
  const { extends: baseConfig, ...extension } = config;
  const baseConfigs = getArray(baseConfig);

  if (baseConfigs.length === 0) {
    return extension;
  }

  const mergedBaseConfig = baseConfigs.reduce((mergedConfig, currentConfig) => {
    const parsedConfig = currentConfig.extends
      ? createConfig(currentConfig)
      : currentConfig;

    return deepmerge(mergedConfig, parsedConfig, {
      arrayMerge(target, source, options) {
        if (options?.isMergeableObject) {
          return [...new Set([...target, ...source])];
        }

        return source;
      },
    });
  }, {});

  return deepmerge(mergedBaseConfig, extension);
}
