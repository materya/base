import BaseError from './BaseError'

/**
 * Error raised when a method is called without the right number of arguments.
 *
 * @augments BaseError
 */
export default class MissingArgumentError extends BaseError {
  /**
   * Instantiate the error with default properties.
   *
   * @param {number} expected - arguments amount expected.
   * @param {number} actual - arguments amount provided.
   */
  constructor (expected: number, actual: number) {
    super(`Missing arguments, expecting ${expected} but ${actual} provided.`)
  }
}
