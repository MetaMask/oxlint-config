import type { OxlintConfig } from 'oxlint';

type Environment = 'browser' | 'commonjs' | 'node' | 'shared-node-browser';

type EnvironmentConfig = {
  availableGlobals: Record<string, 'readable'>;
  restrictedGlobals: {
    name: string;
    message: string;
  }[];
};

/**
 * Get an object containing permitted and restricted globals for a given
 * environment or environments.
 *
 * @param name - The name of the environment or environments for which to
 *   retrieve globals.
 * @param environment - The environment or environments for which to get the
 *   globals.
 * @returns An object containing the available globals and restricted globals
 *   with their corresponding error messages.
 */
export function getEnvironmentGlobals(
  name: string,
  environment: Environment | Environment[],
): EnvironmentConfig;

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
