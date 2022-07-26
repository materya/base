import type { ObjectLiteral } from '../types'

const pick = <T extends ObjectLiteral>(obj: T) => (
  (...keys: Array<keyof T>): Pick<T, typeof keys[number]> => (
    keys.reduce((newObj, k) => (
      Object.prototype.hasOwnProperty.call(obj, k)
        ? { ...newObj, [k]: obj[k] }
        : newObj
    ), {} as T)
  )
)

export default pick
