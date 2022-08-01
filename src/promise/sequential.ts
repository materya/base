/**
 * Callback to execute on each sequence's array element.
 */

interface SequentialCallBack<T, U> {
  (element: T, index: number, array: readonly T[]): Promise<U>
}

/**
 * Execute a promise callback sequentially on a given array.
 *
 * This is for special use cases, most of the time you will want to use
 * `Promise.all()` to paralellize the run of all callbacks.
 */
const sequential = async <T, U>(
  array: readonly T[],
  callback: SequentialCallBack<T, U>,
): Promise<U[]> => {
  const results: U[] = []

  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await callback(array[index], index, array))
  }

  return results
}

export default sequential
