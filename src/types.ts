/**
 * ObjectLiteral
 *
 * Since the standard type `object` is hard to use and error prone,
 * this general type aims to replace it.
 *
 * See https://github.com/microsoft/TypeScript/issues/21732 for more details.
 * See also https://github.com/microsoft/TypeScript/issues/42825 about
 * difference between `unknown` and `any` in this context
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObjectLiteral = Record<PropertyKey, any>

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
 * DeepPartial<Type>
 *
 * Traverse a `Type` extending an object to switch all the props as optionals, recursively.
 */
export type DeepPartial<T> = T extends ObjectLiteral ? {
  [K in keyof T]?: DeepPartial<T[K]>
} : T

/**
 * DeepRequired<Type>
 *
 * Traverse a `Type` extending an object to switch all the props as required, recursively.
 */
export type DeepRequired<T> = T extends ObjectLiteral ? {
  [K in keyof T]-?: DeepRequired<NonNullable<T[K]>>
} : T

/**
 * Opaque<Alias, Type>
 *
 * Type alias that makes a given standard `Type` like `string` unique
 * by its `Alias` name.
 * Similar and inspired by Flow https://flow.org/en/docs/types/opaque-types/
 */
declare const tag: unique symbol
export type Opaque<A, T> = T & { readonly [tag]: A }

/**
 * OptionalProps<Type>
 *
 * Constructs a set of properties type by extracting all the optional keys
 * from `Type`.
 */
export type OptionalProps<T extends ObjectLiteral> = Exclude<{
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
export type RequiredProps<T extends ObjectLiteral> = Exclude<{
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
  T extends ObjectLiteral,
  K extends PropertyKey,
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
  T extends ObjectLiteral,
  K extends PropertyKey,
> = {
  [P in RequiredProps<T>] : T[P]
} & {
  [P in Exclude<OptionalProps<T>, K>]? : T[P]
} & {
  [P in Extract<keyof T, K>]: Exclude<T[P], undefined>
}

/**
 * UnionPick<Type, Values>
 *
 * Constructs a new type as a valid subset of a given union `Type` by picking up all given `Values` from it.
 */
export type UnionPick<T, U extends T> = U
