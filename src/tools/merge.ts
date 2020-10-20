import { InconsistentSourceTypeError } from './errors'
import { MissingArgumentsError } from '../errors'

type SourceArray = Array<unknown>
type SourceMap = Record<string, unknown>
type Source = SourceArray | SourceMap

/**
 * Merge recursively arrays or maps.
 *
 * @module merge
 *
 * @param {[] | object} sources - pack of arrays or maps to merge together.
 *
 * @returns {[] | object} result - A flatten object or array of the given
 *  sources.
 */
function merge (...sources: Source[]): Source {
  if (sources.length <= 1) throw new MissingArgumentsError(2, sources.length)

  return sources.reduce<Source>((flatten, source) => {
    const { toString } = Object.prototype
    if (toString.call(source) !== toString.call(flatten)) {
      throw new InconsistentSourceTypeError(
        toString.call(source),
        toString.call(flatten),
      )
    }

    if (source instanceof Array) {
      return [
        ...flatten as SourceArray,
        ...source.filter(e => !(flatten as SourceArray).includes(e)),
      ]
    }

    const merged = Object.keys(source).reduce<SourceMap>((acc, k) => {
      const value = k in flatten
        && (source[k] instanceof Array || source[k] instanceof Object)
        ? merge((flatten as SourceMap)[k] as Source, source[k] as Source)
        : source[k]
      return { ...acc, [k]: value }
    }, {})

    return { ...flatten, ...merged }
  }, ((sources[0] instanceof Array) ? [] : {}) as Source)
}

export default merge
