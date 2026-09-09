import type { OxlintConfig } from 'oxlint';

/**
 * Create a new Oxlint configuration object by merging extended configurations
 * with the main configuration.
 *
 * @param options - An object containing custom configuration options to
 *   override or extend the base configuration.
 * @returns A new Oxlint configuration object that combines the base
 *   configuration with the provided extensions.
 */
export function createConfig(options: Partial<OxlintConfig>): OxlintConfig;

declare const config: OxlintConfig;
export default config;
