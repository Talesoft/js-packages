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
import type { Uri } from '@talesoft/uri'
import { isArray, isBoolean, isObject } from '@talesoft/types'
import { parse } from '@talesoft/uri'

/**
 * @category Utility
 */
export const schemaStandards = {
  latest: 'http://json-schema.org/schema#',
  hyper: 'http://json-schema.org/hyper-schema#',
  draft04: 'http://json-schema.org/draft-04/schema#',
  draft04Hyper: 'http://json-schema.org/draft-04/hyper-schema#',
  draft03: 'http://json-schema.org/draft-03/schema#',
  draft03Hyper: 'http://json-schema.org/draft-03/hyper-schema#',
} as const

/**
 * @category Utility
 */
export type SchemaStandard = typeof schemaStandards[keyof typeof schemaStandards]

/**
 * @category Utility
 */
export type LatestSchemaStandard = typeof schemaStandards.latest

/**
 * @category Utility
 */
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

/**
 * @category Utility
 */
export type JsType = typeof jsTypes[number]

/**
 * @category Utility
 * @internal
 */
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

/**
 * @category Utility
 */
export const defaults: Record<SimpleType, unknown> = {
  string: '',
  number: 0,
  array: [],
  boolean: false,
  integer: 0,
  null: null,
  object: {},
}

/**
 * @category Predicate
 */
export const isSchema = (value: unknown): value is Schema => isBoolean(value) || isObject(value)

const propertyIsType = (value: unknown, propertyName: string, expectedType: JsType) =>
  isObject(value) && typeof value[propertyName] === expectedType

/**
 * @category Predicate
 */
export const isRef = (value: unknown): value is Reference => propertyIsType(value, '$ref', 'string')

/**
 * @category Predicate
 */
export const isAnchor = (value: unknown): value is Anchor =>
  propertyIsType(value, '$anchor', 'string')

/**
 * @category Predicate
 */
export const isRecursiveRef = (value: unknown): value is RecursiveReference =>
  propertyIsType(value, '$recursiveRef', 'string')

/**
 * @category Predicate
 */
export const isRecursiveAnchor = (value: unknown): value is RecursiveAnchor =>
  propertyIsType(value, '$recursiveAnchor', 'boolean')

/**
 * @category Predicate
 */
export const isDynamicRef = (value: unknown): value is DynamicReference =>
  propertyIsType(value, '$dynamicRef', 'string')

/**
 * @category Predicate
 */
export const isDynamicAnchor = (value: unknown): value is DynamicAnchor =>
  propertyIsType(value, '$dynamicAnchor', 'string')

/**
 * @category Utility
 */
export const dropUriFragment = (uri: Uri, fragment = parse(uri).fragment): Uri => {
  return fragment !== null ? uri.substr(0, uri.length - (fragment.length + 1)) : uri
}

/**
 * Takes a schema and returns the names of all properties of the passed value that are evaluated by it.
 *
 * @category Utility
 *
 * @param schema The schema to evaluate.
 * @param value The value to evaluate against.
 * @returns The evaluated property keys in value.
 */
export const getEvaluatedProperties = (schema: Schema, value: unknown): string[] => {
  if (isBoolean(schema) || !isObject(value)) {
    return []
  }

  return Object.keys(value).filter(
    key =>
      (isObject(schema.properties) && key in schema.properties) ||
      (isObject(schema.patternProperties) &&
        Object.keys(schema.patternProperties).some(pattern => key.match(new RegExp(pattern)))),
  )
}

/**
 * Takes a schema and a value and returns the amount of items it evaluates.
 *
 * @category Utility
 *
 * @param schema The schema to evaluate.
 * @param value The value to evaluate against.
 * @returns The amount of evaluated items.
 */
export const getEvaluatedLength = (schema: Schema, value: unknown): number => {
  if (isBoolean(schema) || !isArray(value)) {
    return 0
  }

  return isSchema(schema.items) ? Infinity : schema.prefixItems?.length ?? 0
}
