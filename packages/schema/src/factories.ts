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
import type { Uri } from '../../uri/esm'
import type { Items, Properties } from './standard/meta/applicator'

/**
 * Creates a `allOf` JSON-Schema.
 *
 * An `allOf` schema means the value has to match *all* of the specified schemas.
 *
 * @category Factory Composition
 *
 * @param schemas The schemas the value has to match.
 * @returns The `allOf` JSON-Schema
 */
export const allOf = <SchemaTypes extends Schema[]>(
  ...schemas: SchemaTypes
): AllOfSchema<SchemaTypes> => ({ allOf: schemas })

/**
 * Creates a `anyOf` JSON-Schema.
 *
 * An `anyOf` schema means the value has to match *any* of the specified schemas.
 * It needs to match at least one of them to be valid at all.
 *
 * @category Factory Composition
 *
 * @param schemas The schemas the value has to match.
 * @returns The `anyOf` JSON-Schema
 */
export const anyOf = <SchemaTypes extends Schema[]>(
  ...schemas: SchemaTypes
): AnyOfSchema<SchemaTypes> => ({ anyOf: schemas })

/**
 * Creates a `oneOf` JSON-Schema.
 *
 * A `oneOf` schema means the value has to match *exactly one* of the specified schemas.
 *
 * @category Factory Composition
 *
 * @param schemas The schemas the value has to match.
 * @returns the `oneOf` JSON-Schema
 */
export const oneOf = <SchemaTypes extends Schema[]>(
  ...schemas: SchemaTypes
): OneOfSchema<SchemaTypes> => ({ oneOf: schemas })

export const not = <SchemaType extends Schema[]>(schema: SchemaType): NotSchema<SchemaType> => ({
  not: schema,
})

/**
 * @category Factory Composition
 */
export const ifThen = <IfSchemaType extends Schema[], ThenSchemaType extends Schema[]>(
  ifSchema: IfSchemaType,
  thenSchema: ThenSchemaType,
): IfThenSchema<IfSchemaType, ThenSchemaType> => ({
  if: ifSchema,
  then: thenSchema,
})

/**
 * @category Factory Composition
 */
export const ifThenElse = <
  IfSchemaType extends Schema[],
  ThenSchemaType extends Schema[],
  ElseSchemaType extends Schema[],
>(
  ifSchema: IfSchemaType,
  thenSchema: ThenSchemaType,
  elseSchema: ElseSchemaType,
): IfThenElseSchema<IfSchemaType, ThenSchemaType, ElseSchemaType> => ({
  if: ifSchema,
  then: thenSchema,
  else: elseSchema,
})

/**
 * @category Factory
 */
export const any = (): AnySchema => true

/**
 * @category Factory
 */
export const nothing = (): NothingSchema => false

/**
 * @category Factory Utility
 */
export const ref = <Uri extends UriReferenceString>(uri: Uri): Reference<Uri> => ({ $ref: uri })

/**
 * @category Factory Utility
 */
export const recursiveRef = <Uri extends UriReferenceString>(
  uri: Uri,
): RecursiveReference<Uri> => ({ $recursiveRef: uri })

/**
 * @category Factory Utility
 */
export const dynamicRef = <Uri extends UriReferenceString>(uri: Uri): DynamicReference<Uri> => ({
  $dynamicRef: uri,
})

/**
 * @category Factory Utility
 */
export const defUri = <DefinitionName extends string>(
  definitionName: DefinitionName,
): `#/$defs/${DefinitionName}` => `#/$defs/${definitionName}`

/**
 * @category Factory Utility
 */
export const def = <DefinitionName extends string>(
  definitionName: DefinitionName,
): Reference<`#/$defs/${DefinitionName}`> => ref(defUri(definitionName))

/**
 * @category Factory Utility
 */
export const externalDefUri = <DefinitionName extends string, SchemaId extends Uri>(
  schemaId: SchemaId,
  definitionName: DefinitionName,
): `${SchemaId}#/$defs/${DefinitionName}` => `${schemaId}#/$defs/${definitionName}`

/**
 * @category Factory Utility
 */
export const externalDef = <DefinitionName extends string, SchemaId extends Uri>(
  schemaId: SchemaId,
  definitionName: DefinitionName,
): Reference<`${SchemaId}#/$defs/${DefinitionName}`> =>
  ref(externalDefUri(schemaId, definitionName))

/**
 * @category Factory Type
 */
export const schemaNull: {
  (): NullTypeSchema
  <SchemaType extends SchemaObject>(options: SchemaType): Readonly<SchemaType> & NullTypeSchema
} = <SchemaType extends SchemaObject>(options?: SchemaType): NullTypeSchema => ({
  ...options,
  type: 'null',
})

/**
 * @category Factory Type
 */
export const nullable = <SchemaType extends SchemaObject>(
  schema: SchemaType,
): OneOfSchema<[SchemaType, NullTypeSchema]> => oneOf(schema, schemaNull())

/**
 * @category Factory Type
 */
export const boolean: {
  (): BooleanTypeSchema
  <SchemaType extends SchemaObject>(options: SchemaType): Readonly<SchemaType> & BooleanTypeSchema
} = <SchemaType extends SchemaObject>(options?: SchemaType): BooleanTypeSchema => ({
  ...options,
  type: 'boolean',
})

/**
 * @category Factory Type
 */
export const string: {
  (): StringTypeSchema
  <SchemaType extends SchemaObject>(options: SchemaType): Readonly<SchemaType> & StringTypeSchema
} = <SchemaType extends SchemaObject>(options?: SchemaType): StringTypeSchema => ({
  ...options,
  type: 'string',
})

/**
 * @category Factory Type
 */
export const number: {
  (): NumberTypeSchema
  <SchemaType extends SchemaObject>(options: SchemaType): Readonly<SchemaType> & NumberTypeSchema
} = <SchemaType extends SchemaObject>(options?: SchemaType): NumberTypeSchema => ({
  ...options,
  type: 'number',
})

/**
 * @category Factory Type
 */
export const integer: {
  (): IntegerTypeSchema
  <SchemaType extends SchemaObject>(options: SchemaType): Readonly<SchemaType> & IntegerTypeSchema
} = <SchemaType extends SchemaObject>(options?: SchemaType): IntegerTypeSchema => ({
  ...options,
  type: 'integer',
})

/**
 * @category Factory Type
 */
export const array: {
  (): ArrayTypeSchema
  <SchemaType extends SchemaObject>(options: SchemaType): Readonly<SchemaType> & ArrayTypeSchema
} = <SchemaType extends SchemaObject>(options?: SchemaType): ArrayTypeSchema => ({
  ...options,
  type: 'array',
})

/**
 * @category Factory Type
 */
export const arrayOf: {
  <Value>(items: Items<Value>): { items: Items<Value> } & ArrayTypeSchema
  <Value, SchemaType extends SchemaObject>(
    items: Items<Value>,
    options: SchemaType,
  ): Readonly<SchemaType> & { items: Items<Value> } & ArrayTypeSchema
} = <Value, SchemaType extends SchemaObject>(
  items: Items<Value>,
  options?: SchemaType,
): { items: Items<Value> } & ArrayTypeSchema => ({
  ...options,
  items,
  type: 'array',
})

/**
 * @category Factory Type
 */
export const object: {
  (): ObjectTypeSchema
  <SchemaType extends SchemaObject>(options: SchemaType): Readonly<SchemaType> & ObjectTypeSchema
} = <SchemaType extends SchemaObject>(options?: SchemaType): ObjectTypeSchema => ({
  ...options,
  type: 'object',
})

/**
 * @category Factory Type
 */
export const objectOf: {
  <Value>(properties: Properties<Value>): { properties: Properties<Value> } & ObjectTypeSchema
  <Value, SchemaType extends SchemaObject>(
    properties: Properties<Value>,
    options: SchemaType,
  ): Readonly<SchemaType> & { properties: Properties<Value> } & ObjectTypeSchema
} = <Value, SchemaType extends SchemaObject>(
  properties: Properties<Value>,
  options?: SchemaType,
): { properties: Properties<Value> } & ObjectTypeSchema => ({
  ...options,
  properties,
  type: 'object',
})

/**
 * @category Factory
 */
export const schema: {
  <Id extends string>(id: Id): { $schema: LatestSchemaStandard; $id: Id }
  <Id extends string, SchemaType extends SchemaObject>(
    id: Id,
    options: SchemaType,
  ): Readonly<SchemaType> & {
    $schema: LatestSchemaStandard
    $id: Id
  }
} = <Id extends string, SchemaType extends SchemaObject>(
  id: Id,
  options?: SchemaType,
): { $schema: LatestSchemaStandard; $id: Id } => ({
  ...options,
  $schema: schemaStandards.latest,
  $id: id,
})
