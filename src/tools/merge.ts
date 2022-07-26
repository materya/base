import { MissingArgumentsError } from '../errors'
import { isObject } from './object'

import type {
  ObjectLiteral,
  DeepPartial,
} from '../types'

type SourceArray = Array<unknown>
type Source = SourceArray | ObjectLiteral
type Sources = DeepPartial<ObjectLiteral>[] | SourceArray[]

/**
 * Merge recursively arrays or maps.
 */
function merge <T extends ObjectLiteral> (...sources: DeepPartial<T>[]): T
function merge <T extends SourceArray> (...sources: T[]): T
function merge (...sources: Sources): Source {
  if (sources.length <= 1) throw new MissingArgumentsError(2, sources.length)

  if (!(sources[0] instanceof Array) && !(isObject(sources[0]))) {
    throw new Error('Sources type are incompatible')
  }

  const isSourcesArray = (test: Source[]): test is SourceArray[] => (
    test[0] instanceof Array
  )

  // Handling Arrays
  if (isSourcesArray(sources)) {
    return sources.reduce((flatten, source) => (
      [
        ...flatten,
        ...source.filter(e => !flatten.includes(e)),
      ]
    ), [])
  }

  // Handling Maps
  return sources.reduce((flatten, source) => {
    const merged = Object.keys(source).reduce((acc, k) => {
      const element = source[k]
      const value = k in flatten
        && (element instanceof Array || isObject(element))
        && typeof element === typeof flatten[k]
        ? merge(flatten[k], element)
        : element
      return { ...acc, [k]: value }
    }, {})

    return { ...flatten, ...merged }
  }, {})
}

export default merge
