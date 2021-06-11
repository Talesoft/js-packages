import type { RegexString } from './common'

export const simpleTypes = [
  'array',
  'boolean',
  'integer',
  'null',
  'number',
  'object',
  'string',
] as const

export type SimpleType = typeof simpleTypes[number]

export type RequiredKeys<Value = unknown> = Value extends Record<string, unknown>
  ? keyof Value
  : string
export type Requirements<Value = unknown> = ReadonlyArray<RequiredKeys<Value>>
export type DependentRequirements<Value = unknown> = Record<
  RequiredKeys<Value>,
  ReadonlyArray<RequiredKeys<Value>>
>

export type ValidationProperties<Value = unknown> = {
  readonly type?: SimpleType | ReadonlyArray<SimpleType>
  readonly const?: Value
  readonly enum?: ReadonlyArray<Value>
  readonly multipleOf?: number
  readonly maximum?: number
  readonly exclusiveMaximum?: number
  readonly minimum?: number
  readonly exclusiveMinimum?: number
  readonly maxLength?: number
  readonly minLength?: number
  readonly pattern?: RegexString
  readonly maxItems?: number
  readonly minItems?: number
  readonly uniqueItems?: boolean
  readonly maxContains?: number
  readonly minContains?: number
  readonly maxProperties?: number
  readonly minProperties?: number
  readonly required?: Requirements<Value>
  readonly dependentRequired?: DependentRequirements<Value>
}

export const validationProperties = [
  'type',
  'const',
  'enum',
  'multipleOf',
  'maximum',
  'exclusiveMaximum',
  'minimum',
  'exclusiveMinimum',
  'maxLength',
  'minLength',
  'pattern',
  'maxItems',
  'minItems',
  'uniqueItems',
  'maxContains',
  'minContains',
  'maxProperties',
  'minProperties',
  'required',
  'dependentRequired',
] as const
