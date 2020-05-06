import { MissingEnvironmentError } from './errors'
/**
 * Enforcing environment variable existence while required
 *
 * If the environment variable does not exist, an error is thrown
 *
 * @param {string} name environment variable name
 *
 * @returns {string} the environment variable value
 *
 * @throws {MissingEnvironmentError} if the env variable does not exist.
 */
const get = (name: string): string => {
  const env = process.env[name]
  if (!env) throw new MissingEnvironmentError(name)
  return env
}

// eslint-disable-next-line import/prefer-default-export
export { get }
