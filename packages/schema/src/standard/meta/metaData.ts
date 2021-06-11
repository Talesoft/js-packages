export type MetaDataProperties<Value = unknown> = {
  readonly title?: string
  readonly description?: string
  readonly default?: boolean
  readonly deprecated?: boolean
  readonly readOnly?: boolean
  readonly writeOnly?: boolean
  readonly examples?: ReadonlyArray<Value>
}

export const metaDataProperties = [
  'title',
  'description',
  'default',
  'deprecated',
  'readOnly',
  'writeOnly',
  'examples',
] as const
