import { MissingArgumentsError } from '../errors'
import { isObject } from './object'

import type {
  AssociativeArray,
  DeepPartial,
} from '../types'

type SourceArray = Array<unknown>
type Source = SourceArray | DeepPartial<AssociativeArray>
type Sources = DeepPartial<AssociativeArray>[] | SourceArray[]

/**
 * Merge recursively arrays or maps.
 */
function merge <T extends AssociativeArray> (...sources: DeepPartial<T>[]): T
function merge <T extends SourceArray> (...sources: T[]): T
function merge (...sources: Sources): Source {
  if (sources.length <= 1) throw new MissingArgumentsError(2, sources.length)

  if (!(sources[0] instanceof Array) && !(isObject(sources[0]))) {
    throw new Error('Sources type are incompatible')
  }

  const isArrayMerge = (test: unknown[]): test is SourceArray[] => (
    test[0] instanceof Array
  )
  const isCompatible = (test: unknown): test is Source => (
    test instanceof Array || isObject(test)
  )

  // Handling Arrays
  if (isArrayMerge(sources)) {
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
        && (isCompatible(element))
        && typeof element === typeof flatten[k]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: TS is stupid af
        ? merge(flatten[k], element)
        : element
      return { ...acc, [k]: value }
    }, {})

    return { ...flatten, ...merged }
  }, {})
}

export default merge
