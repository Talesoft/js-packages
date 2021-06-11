"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = equals;

var _types = require("@talesoft/types");

/**
 * Checks for deep equality between two arbitrary values.
 *
 * Objects and arrays need to equal structurally, not referentially.
 *
 * @param left
 * @param right
 * @returns
 */
function equals(left, right) {
  if (typeof left !== typeof right) {
    return false;
  }

  if (left === right) {
    return true;
  }

  if ((0, _types.isArray)(left) && (0, _types.isArray)(right)) {
    return left.length === right.length && left.every((value, index) => equals(value, right[index]));
  }

  if ((0, _types.isObject)(left) && (0, _types.isObject)(right)) {
    const leftKeys = Object.keys(left);
    return leftKeys.length === Object.keys(right).length && leftKeys.every(key => equals(left[key], right[key]));
  }

  return false;
}