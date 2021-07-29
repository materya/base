// const allCombinations = (
//   ...arrays: unknown[][],
//   previous: unknown[] | unknown[][],
// ): Array<Array<unknown>> => {
//   const [...rest, current] = arrays

//   const sanitizedPrevious: unknown[][] = Array.isArray(previous[0])
//     ? previous as unknown[][]
//     : (previous as unknown[]).map(v => [v])

//   const flatten = current.reduce<Array<Array<unknown>>>((acc, value) => {
//     return acc.map(previousValue => [...previousValue, value])
//   }, sanitizedPrevious)

//   return (rest && rest.length)
//     ? allCombinations(rest, flatten)
//     : flatten
// }

// const contexts = allCombinations(envs, providers, credTypes)
