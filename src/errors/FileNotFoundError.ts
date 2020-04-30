import BaseError from './BaseError'

/**
 * Error raised when a file does not exist in the filesystem.
 * File can also means any valid filesystem citizen like directories
 * or symlinks.
 *
 * @augments BaseError
 */
export default class FileNotFoundError extends BaseError {
  public readonly file: string

  /**
   * Instantiate the error with default properties.
   *
   * @param {string} filepath - Full path of the missing file.
   */
  constructor (filepath: string) {
    super(`${filepath} not found.`)
    this.file = filepath
  }
}
