import type { ApplicatorProperties } from './applicator'
import type { ContentProperties } from './content'
import type { CoreProperties } from './core'
import type { FormatAnnotationProperties } from './formatAnnotation'
import type { MetaDataProperties } from './metaData'
import type { UnevaluatedProperties } from './unevaluated'
import type { ValidationProperties } from './validation'

export type SchemaObject<Value = unknown> = CoreProperties &
  ApplicatorProperties<Value> &
  UnevaluatedProperties<Value> &
  ValidationProperties<Value> &
  MetaDataProperties<Value> &
  FormatAnnotationProperties &
  ContentProperties

export type Schema<Value = unknown> = SchemaObject<Value> | boolean
