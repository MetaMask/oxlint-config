import deepmerge from 'deepmerge';

/**
 * @typedef {import('oxlint').OxlintConfig} OxlintConfig
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
 * Split an object into two: one object with only the given keys, the other with
 * the remainder.
 *
 * @template Type
 * @param {Type} config - The object to split.
 * @param {(keyof Type)[]} keys - The keys to split off.
 * @returns {[Type, Type]} Two objects, with the first containing the given
 *   keys.
 */
function splitObject(config, keys) {
  const objectWithKeys = {};
  const objectWithoutKeys = { ...config };

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(objectWithoutKeys, key)) {
      objectWithKeys[key] = /** @type {unknown} */ (objectWithoutKeys[key]);
      delete objectWithoutKeys[key];
    }
  }

  return [objectWithKeys, objectWithoutKeys];
}

/**
 * Merge an array of base configs into a single config object. Each config is
 * first resolved via {@link createConfig}, then deep-merged in order so that
 * later configs take precedence. Arrays are merged by concatenation with
 * duplicates removed.
 *
 * @param {OxlintConfig | OxlintConfig[] | undefined} baseConfigs - One or more
 *   base configs to merge.
 * @returns {OxlintConfig} The merged base config.
 */
function mergeBaseConfigs(baseConfigs) {
  const baseConfigsArray = getArray(baseConfigs);
  return baseConfigsArray.reduce((mergedConfig, currentConfig) => {
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
  }, {});
}

/**
 * Process a list of override configs, extracting any top-level-only keys (e.g.,
 * `options`) from each override and merging them together. Returns the merged
 * top-level-only options and the overrides with those keys removed.
 *
 * @param {OxlintConfig[]} overrides - The override configs to process.
 * @returns {[OxlintConfig, OxlintConfig[]]} A tuple of the merged
 *   top-level-only options and the overrides with those keys removed.
 */
function hoistTopLevelOnlyOptions(overrides) {
  const result = overrides.reduce(
    /**
     * Reducer that processes each override, extracts its top-level-only keys
     * into `allTopLevelOnlyOptions`, and accumulates the remaining config in
     * `overridesWithoutTopLevelOnlyOptions`.
     *
     * @param {{
     *   allTopLevelOnlyOptions: OxlintConfig;
     *   overridesWithoutTopLevelOnlyOptions: OxlintConfig[];
     * }} options
     *   - The accumulated result from previous iterations.
     * @param {OxlintConfig} override - The current override config to process.
     * @returns {{
     *   allTopLevelOnlyOptions: OxlintConfig;
     *   overridesWithoutTopLevelOnlyOptions: OxlintConfig[];
     * }}
     *   The updated accumulator with the override merged in.
     */
    (
      { allTopLevelOnlyOptions, overridesWithoutTopLevelOnlyOptions },
      override,
    ) => {
      const [
        overrideWithTopLevelOnlyOptions,
        overrideWithoutTopLevelOnlyOptions,
      ] = splitObject(createConfig(override), TOP_LEVEL_ONLY_KEYS);

      return {
        allTopLevelOnlyOptions: deepmerge(
          allTopLevelOnlyOptions,
          overrideWithTopLevelOnlyOptions,
        ),
        overridesWithoutTopLevelOnlyOptions: [
          ...overridesWithoutTopLevelOnlyOptions,
          overrideWithoutTopLevelOnlyOptions,
        ],
      };
    },
    {
      allTopLevelOnlyOptions: {},
      overridesWithoutTopLevelOnlyOptions: [],
    },
  );

  return [
    result.allTopLevelOnlyOptions,
    result.overridesWithoutTopLevelOnlyOptions,
  ];
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
  const {
    extends: baseConfigs,
    overrides = [],
    ...configWithoutExtendsOrOverrides
  } = config;

  const mergedBaseConfig = mergeBaseConfigs(baseConfigs);

  const [topLevelOnlyOptions, overridesWithoutTopLevelOnlyOptions] =
    hoistTopLevelOnlyOptions(overrides);

  return deepmerge(deepmerge(mergedBaseConfig, topLevelOnlyOptions), {
    ...configWithoutExtendsOrOverrides,
    overrides: overridesWithoutTopLevelOnlyOptions,
  });
}
