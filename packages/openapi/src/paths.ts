import type { Reference } from '@talesoft/schema'
import type { Verb } from './common'
import type { Operation } from './operations'
import type { Parameter } from './parameters'
import type { Server } from './servers'

export type Path = string

export type PathItemOperations = { [OperationVerb in Verb]?: Operation }

export type PathItem = PathItemOperations & {
  /**
   * Allows for an external definition of this path item. The referenced structure MUST be in the format of a Path Item Object. In case a Path Item Object field appears both in the defined object and the referenced object, the behavior is undefined.
   */
  $ref?: string
  /**
   * An optional, string summary, intended to apply to all operations in this path.
   */
  summary?: string
  /**
   * An optional, string description, intended to apply to all operations in this path. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * An alternative server array to service all operations in this path.
   */
  servers?: Server[]
  /**
   * A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object's components/parameters.
   */
  parameters?: Array<Parameter | Reference>
}

export type Paths = Record<Path, PathItem>
