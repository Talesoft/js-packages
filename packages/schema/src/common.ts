import type {
  Reference,
  Anchor,
  RecursiveReference,
  RecursiveAnchor,
  DynamicReference,
  DynamicAnchor,
} from './schemas'
import type { SimpleType } from './standard/meta/validation'
import type { Schema } from './standard/meta/schema'
import { isBoolean, isObject } from '@talesoft/types'

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
