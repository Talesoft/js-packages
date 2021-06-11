import type { LatestSchemaStandard } from './common'
import type {
  AllOfSchema,
  AnyOfSchema,
  AnySchema,
  ArrayTypeSchema,
  BooleanTypeSchema,
  DynamicReference,
  IfThenElseSchema,
  IfThenSchema,
  IntegerTypeSchema,
  NothingSchema,
  NotSchema,
  NullTypeSchema,
  NumberTypeSchema,
  ObjectTypeSchema,
  OneOfSchema,
  RecursiveReference,
  Reference,
  StringTypeSchema,
} from './schemas'
import type { UriReferenceString } from './standard/meta/common'
import type { Schema, SchemaObject } from './standard/meta/schema'
import { schemaStandards } from './common'

export function allOf<SchemaTypes extends Schema[]>(
  ...schemas: SchemaTypes
): AllOfSchema<SchemaTypes> {
  return { allOf: schemas }
}

export function anyOf<SchemaTypes extends Schema[]>(
  ...schemas: SchemaTypes
): AnyOfSchema<SchemaTypes> {
  return { anyOf: schemas }
}

export function oneOf<SchemaTypes extends Schema[]>(
  ...schemas: SchemaTypes
): OneOfSchema<SchemaTypes> {
  return { oneOf: schemas }
}

export function not<SchemaType extends Schema>(schema: SchemaType): NotSchema<SchemaType> {
  return { not: schema }
}

export function ifThen<IfSchemaType extends Schema, ThenSchemaType extends Schema>(
  ifSchema: IfSchemaType,
  thenSchema: ThenSchemaType,
): IfThenSchema<IfSchemaType, ThenSchemaType> {
  return { if: ifSchema, then: thenSchema }
}

export function ifThenElse<
  IfSchemaType extends Schema,
  ThenSchemaType extends Schema,
  ElseSchemaType extends Schema,
>(
  ifSchema: IfSchemaType,
  thenSchema: ThenSchemaType,
  elseSchema: ElseSchemaType,
): IfThenElseSchema<IfSchemaType, ThenSchemaType, ElseSchemaType> {
  return { if: ifSchema, then: thenSchema, else: elseSchema }
}

export function any(): AnySchema {
  return true
}

export function nothing(): NothingSchema {
  return false
}

export function ref<Uri extends UriReferenceString>(uri: Uri): Reference<Uri> {
  return { $ref: uri }
}

export function recursiveRef<Uri extends UriReferenceString>(uri: Uri): RecursiveReference<Uri> {
  return { $recursiveRef: uri }
}

export function dynamicRef<Uri extends UriReferenceString>(uri: Uri): DynamicReference<Uri> {
  return { $dynamicRef: uri }
}

export function localDefinitionUri<DefinitionName extends string>(
  definitionName: DefinitionName,
): `#/$defs/${DefinitionName}` {
  return `#/$defs/${definitionName}` as const
}

export function localDefinitionRef<DefinitionName extends string>(
  definitionName: DefinitionName,
): Reference<`#/$defs/${DefinitionName}`> {
  return ref(localDefinitionUri(definitionName))
}

export function localRootIri(): '#' {
  return '#'
}

export function localRootRef(): Reference<'#'> {
  return ref(localRootIri())
}

export function schemaNull(): NullTypeSchema
export function schemaNull<SchemaType extends SchemaObject>(
  options: SchemaType,
): Readonly<SchemaType> & NullTypeSchema
export function schemaNull<SchemaType extends SchemaObject>(
  options?: SchemaType,
): NullTypeSchema | (Readonly<SchemaType> & NullTypeSchema) {
  return {
    ...options,
    type: 'null',
  }
}

export function nullable<SchemaType extends Schema>(
  schema: SchemaType,
): OneOfSchema<[SchemaType, NullTypeSchema]> {
  return oneOf(schema, schemaNull())
}

export function boolean(): BooleanTypeSchema
export function boolean<SchemaType extends SchemaObject>(
  options: SchemaType,
): Readonly<SchemaType> & BooleanTypeSchema
export function boolean<SchemaType extends SchemaObject>(
  options?: SchemaType,
): BooleanTypeSchema | (Readonly<SchemaType> & BooleanTypeSchema) {
  return {
    ...options,
    type: 'boolean',
  }
}

export function string(): StringTypeSchema
export function string<SchemaType extends SchemaObject>(
  options: SchemaType,
): Readonly<SchemaType> & StringTypeSchema
export function string<SchemaType extends SchemaObject>(
  options?: SchemaType,
): StringTypeSchema | (Readonly<SchemaType> & StringTypeSchema) {
  return {
    ...options,
    type: 'string',
  }
}

export function number(): NumberTypeSchema
export function number<SchemaType extends SchemaObject>(
  options: SchemaObject,
): Readonly<SchemaType> & NumberTypeSchema
export function number<SchemaType extends SchemaObject>(
  options?: SchemaType,
): NumberTypeSchema | (Readonly<SchemaType> & NumberTypeSchema) {
  return {
    ...options,
    type: 'number',
  }
}

export function integer(): IntegerTypeSchema
export function integer<SchemaType extends SchemaObject>(
  options: SchemaType,
): Readonly<SchemaType> & IntegerTypeSchema
export function integer<SchemaType extends SchemaObject>(
  options?: SchemaType,
): IntegerTypeSchema | (Readonly<SchemaType> & IntegerTypeSchema) {
  return {
    ...options,
    type: 'integer',
  }
}

export function array(): ArrayTypeSchema
export function array<SchemaType extends SchemaObject>(
  options: SchemaType,
): Readonly<SchemaType> & ArrayTypeSchema
export function array<SchemaType extends SchemaObject>(
  options?: SchemaType,
): ArrayTypeSchema | (Readonly<SchemaType> & ArrayTypeSchema) {
  return {
    ...options,
    type: 'array',
  }
}

export function object(): ObjectTypeSchema
export function object<SchemaType extends SchemaObject>(
  options: SchemaType,
): Readonly<SchemaType> & ObjectTypeSchema
export function object<SchemaType extends SchemaObject>(
  options?: SchemaType,
): ObjectTypeSchema | (Readonly<SchemaType> & ObjectTypeSchema) {
  return {
    ...options,
    type: 'object',
  }
}

export function schema<Id extends string>(id: Id): { $schema: LatestSchemaStandard; $id: Id }
export function schema<Id extends string, SchemaType extends SchemaObject>(
  id: Id,
  options: SchemaType,
): Readonly<SchemaType> & { $schema: LatestSchemaStandard; $id: Id }
export function schema<Id extends string, SchemaType extends SchemaObject>(
  id: Id,
  options?: SchemaType,
):
  | { $schema: LatestSchemaStandard; $id: Id }
  | (Readonly<SchemaType> & { $schema: LatestSchemaStandard; $id: Id }) {
  return {
    ...options,
    $schema: schemaStandards.latest,
    $id: id,
  }
}

export type ValueCreationType = 'default' | 'example'

export type ValueCreationExamples = {
  readonly text: string
  readonly longText: string
  readonly formats: Record<string, string>
}
