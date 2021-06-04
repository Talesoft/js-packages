import type { Primitive, Reference, Schema as JsonSchema } from '@talesoft/schema'
import type { ExternalDocumentation } from './common'

export interface Discriminator {
  /**
   * The name of the property in the payload that will hold the discriminator value.
   */
  propertyName: string
  /**
   * An object to hold mappings between payload values and schema names or references.
   */
  mapping?: Record<string, string>
}

export interface XmlOptions {
  /**
   * Replaces the name of the element/attribute used for the described schema property. When defined within items, it will affect the name of the individual XML elements within the list. When defined alongside type being array (outside the items), it will affect the wrapping element and only if wrapped is true. If wrapped is false, it will be ignored.
   */
  name?: string
  /**
   * The URI of the namespace definition. Value MUST be in the form of an absolute URI.
   */
  namespace?: string
  /**
   * The prefix to be used for the name.
   */
  prefix?: string
  /**
   * Declares whether the property definition translates to an attribute instead of an element. Default value is false.
   */
  attribute?: boolean
  /**
   * MAY be used only for an array definition. Signifies whether the array is wrapped (for example, <books><book/><book/></books>) or unwrapped (<book/><book/>). Default value is false. The definition takes effect only when defined alongside type being array (outside the items).
   */
  wrapped?: boolean
}

export interface Schema extends JsonSchema {
  /* override */ type?: Primitive
  /* override */ allOf?: Array<Schema | Reference>
  /* override */ oneOf?: Array<Schema | Reference>
  /* override */ anyOf?: Array<Schema | Reference>
  /* override */ not?: Schema | Reference
  /* override */ items?: Schema | Reference
  /* override */ properties?: Record<string, Schema | Reference>
  /* override */ additionalProperties?: boolean | Schema | Reference

  /**
   * A true value adds "null" to the allowed type specified by the type keyword, only if type is explicitly defined within the same Schema Object. Other Schema Object constraints retain their defined behavior, and therefore may disallow the use of null as a value. A false value leaves the specified or default type unmodified. The default value is false.
   */
  nullable?: boolean
  /**
   * Adds support for polymorphism. The discriminator is an object name that is used to differentiate between other schemas which may satisfy the payload description. See Composition and Inheritance for more details.
   */
  discriminator?: Discriminator
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as "read only". This means that it MAY be sent as part of a response but SHOULD NOT be sent as part of the request. If the property is marked as readOnly being true and is in the required list, the required will take effect on the response only. A property MUST NOT be marked as both readOnly and writeOnly being true. Default value is false.
   */
  readOnly?: boolean
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as "write only". Therefore, it MAY be sent as part of a request but SHOULD NOT be sent as part of the response. If the property is marked as writeOnly being true and is in the required list, the required will take effect on the request only. A property MUST NOT be marked as both readOnly and writeOnly being true. Default value is false.
   */
  writeOnly?: boolean
  /**
   * This MAY be used only on properties schemas. It has no effect on root schemas. Adds additional metadata to describe the XML representation of this property.
   */
  xml?: XmlOptions
  /**
   * Additional external documentation for this schema.
   */
  externalDocs?: ExternalDocumentation
  /**
   * A free-form property to include an example of an instance for this schema. To represent examples that cannot be naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where necessary.
   */
  example?: unknown
  /**
   * Specifies that a schema is deprecated and SHOULD be transitioned out of usage. Default value is false.
   */
  deprecated?: boolean
}
