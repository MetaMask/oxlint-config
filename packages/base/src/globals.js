// @ts-check

import globals from 'globals';

import { getArray } from './utils.js';

/**
 * The type of environment for which to get the globals.
 *
 * @typedef {'browser' | 'commonjs' | 'node' | 'shared-node-browser'} Environment
 */

/**
 * An array of environments for which to get the globals.
 *
 * @type {Environment[]}
 */
const GLOBALS_ENVIRONMENTS = [
  'browser',
  'commonjs',
  'node',
  'shared-node-browser',
];

const GLOBALS_ARRAY = GLOBALS_ENVIRONMENTS.flatMap((environment) =>
  Object.keys(globals[environment] ?? {}),
);

/**
 * Get an object containing permitted and restricted globals for a given
 * environment or environments.
 *
 * @param {string} name - The name of the environment to be used in the error
 *   message for restricted globals.
 * @param {Environment | Environment[]} environment - The environment or
 *   environments for which to get the globals.
 * @returns {{
 *   availableGlobals: Record<string, 'readonly'>;
 *   restrictedGlobals: { name: string; message: string }[];
 * }}
 *   An object containing the available globals and restricted globals with
 *   their corresponding error messages.
 */
export function getEnvironmentGlobals(name, environment) {
  const environments = getArray(environment);
  const environmentGlobals = environments.flatMap((key) =>
    Object.keys(globals[key] ?? {}),
  );

  /**
   * @type {Record<string, 'readonly'>}
   */
  const availableGlobals = Object.fromEntries(
    environmentGlobals.map((global) => [global, 'readonly']),
  );

  const restrictedGlobals = GLOBALS_ARRAY.filter(
    (global) => !environmentGlobals.includes(global),
  ).map((globalName) => ({
    name: globalName,
    message: `This global is not available in the ${name} environment.`,
  }));

  return {
    availableGlobals,
    restrictedGlobals,
  };
}
