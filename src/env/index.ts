import { MissingEnvironmentError } from './errors'
/**
 * Enforcing environment variable existence or providing a default value.
 *
 * If the environment variable does not exist and no default value is provided
 * a `MissingEnvironmentError` error is thrown.
 *
 * @param {string} name - environment variable name.
 * @param {string} [defaultValue] - default value if variable not found.
 * @returns {string} the environment variable value.
 * @throws {MissingEnvironmentError} if the env variable does not exist.
 */
const get = (name: string, defaultValue?: string): string => {
  const env = process.env[name]
  if (!env && !defaultValue) throw new MissingEnvironmentError(name)
  return env as string ?? defaultValue
}

// eslint-disable-next-line import/prefer-default-export
export { get }
