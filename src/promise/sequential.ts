/**
 * Callback to execute on each sequence's array element.
 *
 * @callback SequentialCallBack
 *
 * @template T
 * @template U
 * @param {T} element - The element to apply the callback on.
 * @param {number} index - The element position in the reference array.
 * @param {Array.<T>} array - The reference array.
 *
 * @returns {Promise<U>} - A promise returning result operation on element.
 */

interface SequentialCallBack<T, U> {
  (element: T, index: number, array: Array<T>): Promise<U>
}

/**
 * Execute a promise callback sequentially on a given array.
 *
 * This is for special use cases, most of the time you will want to use
 * `Promise.all()` to paralellize the run of all callbacks.
 *
 * @param {Array} array - The array to iterate the callback on.
 * @param {SequentialCallBack} callback - The promise callback to call on each
 *  array element.
 *
 * @returns {Promise<Array>} A promise to the array of results from callbacks.
 */
const sequential = async <T, U>(
  array: Array<T>,
  callback: SequentialCallBack<T, U>,
): Promise<Array<U>> => {
  const results = []
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await callback(array[index], index, array))
  }
  return results
}

export default sequential
