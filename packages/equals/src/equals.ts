import { isArray, isObject } from '@talesoft/types'

/**
 * Checks for deep equality between two arbitrary values.
 *
 * Objects and arrays need to equal structurally, not referentially.
 *
 * @param left
 * @param right
 * @returns
 */
const equals = <Value>(left: Value, right: Value): boolean => {
  if (typeof left !== typeof right) {
    return false
  }

  if (left === right) {
    return true
  }

  if (isArray(left) && isArray(right)) {
    return left.length === right.length && left.every((value, index) => equals(value, right[index]))
  }

  if (isObject(left) && isObject(right)) {
    const leftKeys = Object.keys(left)
    return (
      leftKeys.length === Object.keys(right).length &&
      leftKeys.every(key => equals(left[key], right[key]))
    )
  }

  return false
}

export default equals
