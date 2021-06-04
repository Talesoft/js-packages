import type { UriReferenceString, AnchorString } from './standard/meta/common'
import type { Schema } from './standard/meta/schema'

export type Reference<Uri extends UriReferenceString = UriReferenceString> = { readonly $ref: Uri }
/** @deprecated replaced for DynamicReference */
export type RecursiveReference<Uri extends UriReferenceString = UriReferenceString> = {
  readonly $recursiveRef: Uri
}
export type DynamicReference<Uri extends UriReferenceString = UriReferenceString> = {
  readonly $dynamicRef: Uri
}

export type Anchor<Name extends AnchorString = AnchorString> = { readonly $anchor: Name }
/** @deprecated replaced for DynamicAnchor */
export type RecursiveAnchor<Name extends AnchorString = AnchorString> = {
  readonly $recursiveAnchor: Name
}
export type DynamicAnchor<Name extends AnchorString = AnchorString> = {
  readonly $dynamicAnchor: Name
}

export type AnySchema = true | Record<string, never>
export type NothingSchema = false | NotSchema<AnySchema>

export type AllOfSchema<SchemaTypes extends Schema[]> = { readonly allOf: SchemaTypes }
export type AnyOfSchema<SchemaTypes extends Schema[]> = { readonly anyOf: SchemaTypes }
export type OneOfSchema<SchemaTypes extends Schema[]> = { readonly oneOf: SchemaTypes }
export type NotSchema<SchemaType extends Schema> = { readonly not: SchemaType }

export type IfThenSchema<IfSchemaType extends Schema, ThenSchemaType extends Schema> = {
  readonly if: IfSchemaType
  readonly then?: ThenSchemaType
}

export type IfThenElseSchema<
  IfSchemaType extends Schema,
  ThenSchemaType extends Schema,
  ElseSchemaType extends Schema,
> = {
  readonly if: IfSchemaType
  readonly then?: ThenSchemaType
  readonly else?: ElseSchemaType
}

export type NullTypeSchema = { readonly type: 'null' }
export type BooleanTypeSchema = { readonly type: 'boolean' }
export type StringTypeSchema = { readonly type: 'string' }
export type NumberTypeSchema = { readonly type: 'number' }
export type IntegerTypeSchema = { readonly type: 'integer' }
export type ArrayTypeSchema = { readonly type: 'array' }
export type ObjectTypeSchema = { readonly type: 'object' }
