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
 * Keys that oxlint only recognises at the top level of a config and must not
 * appear inside an `overrides` entry. When these keys are introduced by an
 * extended config that is used inside an override, they are hoisted to the
 * surrounding config level.
 */
const TOP_LEVEL_ONLY_KEYS = ['options'];

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
 * Split a resolved config object into top-level-only keys and the remainder.
 *
 * @param {Partial<OxlintConfig>} config - The resolved config to split.
 * @returns {{
 *   hoisted: Partial<OxlintConfig>;
 *   rest: Partial<OxlintConfig>;
 * }}
 *   The hoisted and remaining config parts.
 */
function extractTopLevelOnly(config) {
  const hoisted = {};
  const rest = { ...config };

  for (const key of TOP_LEVEL_ONLY_KEYS) {
    if (Object.prototype.hasOwnProperty.call(rest, key)) {
      hoisted[key] = /** @type {unknown} */ (rest[key]);
      delete rest[key];
    }
  }

  return { hoisted, rest };
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
 *   const config = createConfig({
 *     extends: typescript,
 *   });
 *
 *   export default config;
 *
 * @example <caption>Extending multiple configs</caption>
 *   import { createConfig } from '@metamask/oxlint-config';
 *   import typescript from '@metamask/oxlint-config-typescript';
 *   import nodejs from '@metamask/oxlint-config-nodejs';
 *
 *   const config = createConfig({
 *     extends: [typescript, nodejs],
 *   });
 *
 *   export default configs;
 *
 * @example <caption>Extending configs with overrides</caption>
 *   import { createConfig } from '@metamask/oxlint-config';
 *   import typescript from '@metamask/oxlint-config-typescript';
 *   import nodejs from '@metamask/oxlint-config-nodejs';
 *
 *   const config = createConfig({
 *     extends: [nodejs],
 *
 *     overrides: [
 *       {
 *         files: ['**\/*.ts'],
 *         extends: [typescript],
 *       },
 *     ],
 *   });
 *
 *   export default config;
 *
 * @param {OxlintConfig} config - The config object to create, which may include
 *   an `extends` property that specifies one or more base configs to extend,
 *   and an `overrides` property for file-specific config overrides.
 * @returns {Omit<OxlintConfig, "extends">} A single config object with all the
 *   extended configs merged in.
 */
export function createConfig(config) {
  const { extends: baseConfig, overrides = [], ...extension } = config;
  const baseConfigs = getArray(baseConfig);

  const result = overrides.reduce(
    /**
     * Reducer that processes each override, extracts its top-level-only keys
     * into `hoistedFromOverrides`, and accumulates the remaining config in
     * `resolvedOverrides`.
     *
     * @param {{
     *   hoistedFromOverrides: OxlintConfig;
     *   resolvedOverrides: OxlintConfig[];
     * }} options
     *   - The accumulated result from previous iterations.
     * @param {OxlintConfig} override - The current override config to process.
     * @returns {{
     *   hoistedFromOverrides: OxlintConfig;
     *   resolvedOverrides: OxlintConfig[];
     * }}
     *   The updated accumulator with the override merged in.
     */
    (
      { hoistedFromOverrides: accumulator, resolvedOverrides: resolved },
      override,
    ) => {
      const { hoisted, rest } = extractTopLevelOnly(createConfig(override));
      return {
        hoistedFromOverrides: deepmerge(accumulator, hoisted),
        resolvedOverrides: [...resolved, rest],
      };
    },
    { hoistedFromOverrides: {}, resolvedOverrides: [] },
  );

  const { hoistedFromOverrides, resolvedOverrides } = result;
  const resolvedExtension =
    resolvedOverrides.length > 0
      ? { ...extension, overrides: resolvedOverrides }
      : extension;

  const mergedBaseConfig = baseConfigs.reduce(
    /**
     * Reducer that merges each resolved base config into the accumulator using
     * `deepmerge`.
     *
     * @param {OxlintConfig} mergedConfig - The accumulated merged config.
     * @param {OxlintConfig} currentConfig - The current base config to merge
     *   in.
     * @returns {OxlintConfig} The merged config.
     */
    (mergedConfig, currentConfig) => {
      const parsedConfig = createConfig(currentConfig);

      return deepmerge(mergedConfig, parsedConfig, {
        /**
         * Merge arrays by concatenating them and removing duplicates.
         *
         * @template Target
         * @template Source
         * @param {Target[]} target - The target array.
         * @param {Source[]} source - The source array.
         * @param {deepmerge.ArrayMergeOptions} options - Options for performing
         *   the merge.
         * @returns {(Source & Target)[]} The result of the merge.
         */
        arrayMerge(target, source, options) {
          if (options?.isMergeableObject) {
            return [...new Set([...target, ...source])];
          }

          return source;
        },
      });
    },
    {},
  );

  return deepmerge(
    deepmerge(mergedBaseConfig, hoistedFromOverrides),
    resolvedExtension,
  );
}
