/**
 * ObjectIndex
 *
 * Allowed object (associative array) index types.
 *
 * `keyof any` results as `number | string | symbol`, we use it here instead
 * of hardcoding it to stay compatible if somewhere in the future
 * that may change.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObjectIndex = keyof any

/**
 * AssociativeArray
 *
 * Since the standard type `object` is hard to use and error prone,
 * this general type aims to replace it.
 *
 * See https://github.com/microsoft/TypeScript/issues/21732 for more details.
 */
export type AssociativeArray = Record<ObjectIndex, unknown>

/**
 * CastIndexSignature<Type>
 *
 * Workaround to fix an index signature issue with interfaces.
 *
 * See https://github.com/microsoft/TypeScript/issues/15300 for more details.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type CastIndexSignature<T extends object> = {
  [K in keyof T]: T[K]
}

/**
 * OptionalProps<Type>
 *
 * Constructs a set of properties type by extracting all the optional keys
 * from `Type`.
 */
export type OptionalProps<T extends AssociativeArray> = Exclude<{
  [K in keyof T]: T extends Record<K, T[K]>
    ? never
    : K
}[keyof T], undefined>

/**
 * RequiredProps<Type>
 *
 * Constructs a set of properties type by extracting all the required keys
 * from `Type`.
 */
export type RequiredProps<T extends AssociativeArray> = Exclude<{
  [K in keyof T]: T extends Record<K, T[K]>
    ? K
    : never
}[keyof T], undefined>

/**
 * SelectivePartial<Type, Keys>
 *
 * Constructs a type by picking all properties from `Type` and then switching `Keys` as optionals.
 */
export type SelectivePartial<
  T extends AssociativeArray,
  K extends ObjectIndex,
> = {
  [P in Exclude<RequiredProps<T>, K>] : T[P]
} & {
  [P in OptionalProps<T>]? : T[P]
} & {
  [P in Extract<keyof T, K>]?: T[P]
}

/**
 * SelectiveRequired<Type, Keys>
 *
 * Constructs a type by picking all properties from `Type` and then switching `Keys` as required.
 */
export type SelectiveRequired<
  T extends AssociativeArray,
  K extends ObjectIndex,
> = {
  [P in RequiredProps<T>] : T[P]
} & {
  [P in Exclude<OptionalProps<T>, K>]? : T[P]
} & {
  [P in Extract<keyof T, K>]: Exclude<T[P], undefined>
}
