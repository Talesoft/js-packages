import type {
  Reference,
  Anchor,
  RecursiveReference,
  RecursiveAnchor,
  DynamicReference,
  DynamicAnchor,
} from './schemas'
import { Schema } from './standard/meta/schema'
import type { SimpleType } from './standard/meta/validation'

export const schemaStandards = {
  latest: 'https://json-schema.org/draft/2020-12/schema',
} as const

export type SchemaStandard = typeof schemaStandards[keyof typeof schemaStandards]
export type LatestSchemaStandard = typeof schemaStandards.latest

export const jsTypes = [
  'string',
  'number',
  'bigint',
  'boolean',
  'symbol',
  'undefined',
  'object',
  'function',
] as const

export type JsType = typeof jsTypes[number]

export const jsTypeMap: Record<JsType, SimpleType> = {
  string: 'string',
  number: 'number',
  bigint: 'string',
  boolean: 'boolean',
  symbol: 'string',
  undefined: 'null',
  object: 'object',
  function: 'object',
}

export const defaults: Record<SimpleType, unknown> = {
  string: '',
  number: 0,
  array: [],
  boolean: false,
  integer: 0,
  null: null,
  object: {},
}

export function isNull(value: unknown): value is null {
  return value === null
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isInteger(value: unknown): value is number {
  return isNumber(value) && Math.floor(value) === value
}

export function isNumeric(value: unknown): value is string | number {
  return !isNaN(parseFloat(String(value))) && isFinite(Number(value))
}

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isSchema(value: unknown): value is Schema {
  return isBoolean(value) || isObject(value)
}

function propertyIsType(value: unknown, propertyName: string, expectedType: JsType): boolean {
  return isObject(value) && typeof value[propertyName] === expectedType
}

export function isRef(value: unknown): value is Reference {
  return propertyIsType(value, '$ref', 'string')
}

export function isAnchor(value: unknown): value is Anchor {
  return propertyIsType(value, '$anchor', 'string')
}

export function isRecursiveRef(value: unknown): value is RecursiveReference {
  return propertyIsType(value, '$recursiveRef', 'string')
}

export function isRecursiveAnchor(value: unknown): value is RecursiveAnchor {
  return propertyIsType(value, '$recursiveAnchor', 'string')
}

export function isDynamicRef(value: unknown): value is DynamicReference {
  return propertyIsType(value, '$dynamicRef', 'string')
}

export function isDynamicAnchor(value: unknown): value is DynamicAnchor {
  return propertyIsType(value, '$dynamicAnchor', 'string')
}

/**
 * Checks for deep equality between two arbitrary values
 *
 * @param left
 * @param right
 * @returns
 */
export function equals<Value>(left: Value, right: Value): boolean {
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
