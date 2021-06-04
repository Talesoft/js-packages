import type { Reference } from '@talesoft/schema'
import type { Example } from './common'
import type { MediaType } from './mediaTypes'
import type { Schema } from './schemas'

export type SchemaParameterStyle =
  | 'matrix'
  | 'label'
  | 'form'
  | 'simple'
  | 'spaceDelimited'
  | 'pipeDelimited'
  | 'deepObject'

export type ParameterLocation = 'query' | 'header' | 'path' | 'cookie'

export interface ParameterIdentity {
  /**
   * The name of the parameter. Parameter names are case sensitive.
   *
   * If in is "path", the name field MUST correspond to a template expression occurring within the path field in the Paths Object. See Path Templating for further information.
   * If in is "header" and the name field is "Accept", "Content-Type" or "Authorization", the parameter definition SHALL be ignored.
   * For all other cases, the name corresponds to the parameter name used by the in property.
   */
  name: string
  /**
   * The location of the parameter. Possible values are "query", "header", "path" or "cookie".
   */
  in: ParameterLocation
}

export interface ParameterBase {
  /**
   * A brief description of the parameter. This could contain examples of use. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false.
   */
  deprecated?: boolean
  /**
   * Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a parameter with an empty value. Default value is false. If style is used, and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.
   */
  allowEmptyValue?: boolean
}

export interface SchemaParameter extends ParameterBase {
  /**
   * The schema defining the type used for the parameter.
   */
  schema: Schema | Reference
  /**
   * Describes how the parameter value will be serialized depending on the type of the parameter value.
   *
   * Default values (based on value of in):
   *   for query - form;
   *   for path - simple;
   *   for header - simple;
   *   for cookie - form.
   */
  style?: SchemaParameterStyle
  /**
   * When this is true, parameter values of type array or object generate separate parameters for each value of the array or key-value pair of the map. For other types of parameters this property has no effect. When style is form, the default value is true. For all other styles, the default value is false.
   */
  explode?: boolean
  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as defined by RFC3986 :/?#[]@!$&'()*+,;= to be included without percent-encoding. This property only applies to parameters with an in value of query. The default value is false.
   */
  allowReserved?: boolean
  /**
   * Example of the parameter's potential value. The example SHOULD match the specified schema and encoding properties if present. The example field is mutually exclusive of the examples field. Furthermore, if referencing a schema that contains an example, the example value SHALL override the example provided by the schema. To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.
   */
  example?: unknown
  /**
   * Examples of the parameter's potential value. Each example SHOULD contain a value in the correct format as specified in the parameter encoding. The examples field is mutually exclusive of the example field. Furthermore, if referencing a schema that contains an example, the examples value SHALL override the example provided by the schema.
   */
  examples?: Record<string, Example | Reference>
}

export interface ContentParameter extends ParameterBase {
  /**
   * 	A map containing the representations for the parameter. The key is the media type and the value describes it. The map MUST only contain one entry.
   */
  content: Record<string, MediaType>
}

export type Parameter =
  | (ParameterIdentity & SchemaParameter)
  | (ParameterIdentity & ContentParameter)

export type Header = SchemaParameter | ContentParameter
