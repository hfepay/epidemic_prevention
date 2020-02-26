import { isArray } from './validate'

export function splitByLength(arr, length = 1) {
  const result = []
  let quotient = arr.length / length
  const remainder = arr.length % length
  while (--quotient >= 0) {
    const newArr = arr.splice(length)
    result.push(arr)
    arr = newArr
  }
  remainder && result.push(arr)
  return result
}

export function flat(arr, level = Infinity) {
  if (Array.flat) {
    return arr.flat(Infinity)
  } else {
    while (arr.some(isArray)) {
      arr = [].concat(...arr)
    }
    return arr
  }
}
