import { BaseError } from '../../errors'

/**
 * Error raised when a file does not exist in the filesystem.
 * File can also means any valid filesystem citizen like directories
 * or symlinks.
 *
 * @augments BaseError
 */
export default class MissingEnvError extends BaseError {
  public readonly name: string

  /**
   * Instantiate the error with default properties.
   *
   * @param {string} name - Name of the missing environment variable.
   */
  constructor (name: string) {
    super(`Environment variable ${name} not found.`)
    this.name = name
  }
}
