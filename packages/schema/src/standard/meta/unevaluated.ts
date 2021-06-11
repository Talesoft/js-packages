import type { Schema } from './schema'

export type UnevaluatedProperties<Value = unknown> = {
  readonly unevaluatedItems?: Schema<Value>
  readonly unevaluatedProperties?: Schema<Value>
}

export const unevaluatedProperties: ReadonlyArray<keyof UnevaluatedProperties> = [
  'unevaluatedItems',
  'unevaluatedProperties',
] as const
