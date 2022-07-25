/**
 * Check if a given object is an associative array / "object literal"
 * Based mainly on the answers of this SO question : https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript/22482737#22482737
 */
export const isObject = (obj: unknown): boolean => (
  Object.prototype.toString.call(obj) === '[object Object]'
)

export default {
  isObject,
}
