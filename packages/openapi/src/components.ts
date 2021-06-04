import type { Reference } from '@talesoft/schema'
import type { Callback } from './callbacks'
import type { Example } from './common'
import type { Link } from './links'
import type { RequestBody } from './operations'
import type { Parameter, Header } from './parameters'
import type { Schema } from './schemas'
import type { SecurityScheme } from './security'

export interface Components {
  /**
   * An object to hold reusable Schema Objects.
   */
  schemas?: Record<string, Schema | Reference>
  /**
   * An object to hold reusable Response Objects.
   */
  responses?: Record<string, Response | Reference>
  /**
   * An object to hold reusable Parameter Objects.
   */
  parameters?: Record<string, Parameter | Reference>
  /**
   * An object to hold reusable Example Objects.
   */
  examples?: Record<string, Example | Reference>
  /**
   * An object to hold reusable Request Body Objects.
   */
  requestBodies?: Record<string, RequestBody | Reference>
  /**
   * An object to hold reusable Header Objects.
   */
  headers?: Record<string, Header | Reference>
  /**
   * An object to hold reusable Security Scheme Objects.
   */
  securitySchemes?: Record<string, SecurityScheme | Reference>
  /**
   * An object to hold reusable Link Objects.
   */
  links?: Record<string, Link | Reference>
  /**
   * An object to hold reusable Callback Objects.
   */
  callbacks?: Record<string, Callback | Reference>
}
