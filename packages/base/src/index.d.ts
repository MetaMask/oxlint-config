import type { OxlintConfig, OxlintOverride } from 'oxlint';

/**
 * An Oxlint config override that can be extended with an "extends" property.
 */
type ExtendableOxlintOverride = OxlintOverride & {
  extends?: Partial<ExtendableOxlintOverride>[];
};

/**
 * An Oxlint config that can be extended with {@link ExtendableOxlintOverride}s.
 */
type ExtendableOxlintConfig = OxlintConfig & {
  overrides?: ExtendableOxlintOverride[];
};

/**
 * Create a new Oxlint configuration object by merging extended configurations
 * with the main configuration.
 *
 * @param options - An object containing custom configuration options to
 *   override or extend the base configuration.
 * @returns A new Oxlint configuration object that combines the base
 *   configuration with the provided extensions.
 */
export function createConfig(
  options: Partial<ExtendableOxlintConfig>,
): Omit<OxlintConfig, 'extends'>;

declare const config: OxlintConfig;
export default config;
