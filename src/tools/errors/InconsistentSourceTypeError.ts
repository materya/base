import BaseError from '../../errors/BaseError'

/**
 * Error raised when 2 sources input type does not match each other.
 *
 * @augments BaseError
 */
export default class InconsistentSourceTypeError extends BaseError {
  public readonly source1: string

  public readonly source2: string

  /**
   * Instantiate the error with default properties.
   *
   * @param {string} source1 - Type of the first source.
   * @param {string} source2 - Type of the second source.
   */
  constructor (source1: string, source2: string) {
    super(`inconsistent type between ${source1} and ${source2}.`)
    this.source1 = source1
    this.source2 = source2
  }
}
