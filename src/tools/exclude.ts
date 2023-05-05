import { ObjectLiteral } from '../types'

const exclude = <T extends ObjectLiteral>(obj: T) => (
  (...keys: Array<keyof T>): Exclude<T, typeof keys[number]> => (
    Object.keys(obj)
      .filter(k => !keys.includes(k as keyof T))
      .reduce((newObj, k) => (
        Object.prototype.hasOwnProperty.call(obj, k)
          ? { ...newObj, [k]: obj[k] }
          : newObj
      ), {} as Exclude<T, typeof keys[number]>)
  )
)

export default exclude
