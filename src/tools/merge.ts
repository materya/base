import { MissingArgumentsError } from '../errors'

type SourceArray = Array<unknown>
// Using `any` in `Record` here, since that's the only possible value
// to match with interfaces atm.
// issue => https://github.com/Microsoft/TypeScript/issues/15300
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SourceMap = Record<string, any>
type Source = SourceArray | SourceMap

/**
 * Merge recursively arrays or maps.
 *
 * @module merge
 * @param {[] | object} sources - pack of arrays or maps to merge together.
 * @returns {[] | object} result - A flatten object or array of the given sources.
 */
function merge <T extends Source> (...sources: Partial<T>[]): T {
  if (sources.length <= 1) throw new MissingArgumentsError(2, sources.length)

  return sources.reduce<T>((flatten, source) => {
    // Handling Arrays
    if (source instanceof Array) {
      return [
        ...flatten as SourceArray,
        ...source.filter((e: T) => !(flatten as SourceArray).includes(e)),
      ] as T
    }

    // Handling Maps
    const merged = Object.keys(source).reduce<SourceMap>((acc, k) => {
      const element = (source as SourceMap)[k]
      const value = k in flatten
        && (element instanceof Array || element instanceof Object)
        ? merge((flatten as SourceMap)[k] as Partial<T>, element as Partial<T>)
        : element
      return { ...acc, [k]: value }
    }, {})

    return { ...flatten, ...merged }
  }, ((sources[0] instanceof Array) ? [] : {}) as T)
}

export default merge
