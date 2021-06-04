export type Expression = string

export type Verb = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'

export type StatusCode = string

export interface ExternalDocumentation {
  /**
   * The URL for the target documentation. Value MUST be in the format of a URL.
   */
  url: string
  /**
   * A short description of the target documentation. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
}

export interface Example {
  /**
   * Short description for the example.
   */
  summary?: string
  /**
   * Long description for the example. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * Embedded literal example. The value field and externalValue field are mutually exclusive. To represent examples of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example, escaping where necessary.
   */
  value?: unknown
  /**
   * A URL that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents. The value field and externalValue field are mutually exclusive.
   */
  externalValue?: string
}

export interface Tag {
  /**
   * The name of the tag.
   */
  name: string
  /**
   * A short description for the tag. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * Additional external documentation for this tag.
   */
  externalDocs?: ExternalDocumentation
}

export type ExtensionField<Name extends string = string> = `x-${Name}`
