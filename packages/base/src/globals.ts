import globals from 'globals';

const GLOBALS_ENVIRONMENTS = [
  'browser',
  'commonjs',
  'node',
  'shared-node-browser',
] as const;

const GLOBALS_ARRAY = GLOBALS_ENVIRONMENTS.flatMap((environment) =>
  Object.keys(globals[environment] ?? {}),
);

type Environment = (typeof GLOBALS_ENVIRONMENTS)[number];

/**
 * Get an object containing permitted and restricted globals for a given
 * environment or environments.
 *
 * @param name - The name of the environment to be used in the error message for
 *   restricted globals.
 * @param environment - The environment or environments for which to get the
 *   globals.
 * @returns An object containing the available globals and restricted globals
 *   with their corresponding error messages.
 */
export function getEnvironmentGlobals(
  name: string,
  environment: Environment | Environment[],
) {
  const environments = Array.isArray(environment) ? environment : [environment];
  const availableGlobals = environments.flatMap((environment) =>
    Object.keys(globals[environment] ?? {}),
  );

  const restrictedGlobals = GLOBALS_ARRAY.filter(
    (global) => !availableGlobals.includes(global),
  ).map((global) => ({
    name: global,
    message: `This global is not available in the ${name} environment.`,
  }));

  return {
    availableGlobals,
    restrictedGlobals,
  };
}
