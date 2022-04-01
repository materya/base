import type { AssociativeArray } from '../@types'

const pick = <T extends AssociativeArray>(obj: T) => (
  (...keys: Array<keyof T>): Pick<T, typeof keys[number]> => (
    keys.reduce((newObj, k) => (
      Object.prototype.hasOwnProperty.call(obj, k)
        ? { ...newObj, [k]: obj[k] }
        : newObj
    ), {} as T)
  )
)

export default pick
