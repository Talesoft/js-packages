import type { Properties } from './standard/meta/applicator'
import type { UriReferenceString, AnchorString } from './standard/meta/common'
import type { Schema } from './standard/meta/schema'

/**
 * @category Schema Type
 */
export type Reference<Uri extends UriReferenceString = UriReferenceString> = { readonly $ref: Uri }

/**
 * @category Schema Type
 */
export type RecursiveReference<Uri extends UriReferenceString = UriReferenceString> = {
  readonly $recursiveRef: Uri
}

/**
 * @category Schema Type
 */
export type DynamicReference<Uri extends UriReferenceString = UriReferenceString> = {
  readonly $dynamicRef: Uri
}

/**
 * @category Schema Type
 */
export type Anchor<Name extends AnchorString = AnchorString> = { readonly $anchor: Name }

/**
 * @category Schema Type
 */
export type RecursiveAnchor<Name extends AnchorString = AnchorString> = {
  readonly $recursiveAnchor: Name
}

/**
 * @category Schema Type
 */
export type DynamicAnchor<Name extends AnchorString = AnchorString> = {
  readonly $dynamicAnchor: Name
}

/**
 * @category Schema Type
 */
export type AnySchema = true | Record<string, never>

/**
 * @category Schema Type
 */
export type NothingSchema = false | NotSchema<AnySchema>

/**
 * @category Schema Type
 */
export type AllOfSchema<SchemaTypes extends Schema[]> = { readonly allOf: SchemaTypes }

/**
 * @category Schema Type
 */
export type AnyOfSchema<SchemaTypes extends Schema[]> = { readonly anyOf: SchemaTypes }

/**
 * @category Schema Type
 */
export type OneOfSchema<SchemaTypes extends Schema[]> = { readonly oneOf: SchemaTypes }

/**
 * @category Schema Type
 */
export type NotSchema<SchemaType extends Schema> = { readonly not: SchemaType }

/**
 * @category Schema Type
 */
export type IfThenSchema<IfSchemaType extends Schema, ThenSchemaType extends Schema> = {
  readonly if: IfSchemaType
  readonly then?: ThenSchemaType
}

/**
 * @category Schema Type
 */
export type IfThenElseSchema<
  IfSchemaType extends Schema,
  ThenSchemaType extends Schema,
  ElseSchemaType extends Schema,
> = {
  readonly if: IfSchemaType
  readonly then?: ThenSchemaType
  readonly else?: ElseSchemaType
}

/**
 * @category Schema Type
 */
export type NullTypeSchema = { readonly type: 'null' }

/**
 * @category Schema Type
 */
export type BooleanTypeSchema = { readonly type: 'boolean' }

/**
 * @category Schema Type
 */
export type StringTypeSchema = { readonly type: 'string' }

/**
 * @category Schema Type
 */
export type NumberTypeSchema = { readonly type: 'number' }

/**
 * @category Schema Type
 */
export type IntegerTypeSchema = { readonly type: 'integer' }

/**
 * @category Schema Type
 */
export type ArrayTypeSchema = { readonly type: 'array' }

/**
 * @category Schema Type
 */
export type ArrayItemsTypeSchema = ArrayTypeSchema & { readonly items: Schema }

/**
 * @category Schema Type
 */
export type ObjectTypeSchema = { readonly type: 'object' }

/**
 * @category Schema Type
 */
export type ObjectPropertiesTypeSchema<Value = unknown> = ObjectTypeSchema & {
  properties: Properties<Value>
}
