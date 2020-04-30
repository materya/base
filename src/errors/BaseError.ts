/**
 * Base error object to be extended from.
 * This class should never be directly used to throw an error.
 *
 * @augments Error
 */
export default class BaseError extends Error {
  /**
   * Instantiate the error with default properties.
   *
   * @param {string} message - Human readable error description.
   */
  constructor (message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
