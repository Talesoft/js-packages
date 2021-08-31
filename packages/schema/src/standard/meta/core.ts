import type { Uri } from '../../../../uri/esm'
import type { UriReferenceString, AnchorString } from './common'
import type { Schema } from './schema'

/**
 * @category JSON-Schema Utility
 */
export type Vocabulary = Record<string, boolean>

/**
 * @category JSON-Schema Property
 */
export type CoreProperties = {
  readonly $id?: string
  readonly $schema?: Uri
  readonly $ref?: UriReferenceString
  readonly $anchor?: AnchorString
  /** @deprecated replaced by $dynamicRef */
  readonly $recursiveRef?: UriReferenceString
  /** @deprecated replaced by $dynamicAnchor */
  readonly $recursiveAnchor?: boolean
  readonly $dynamicRef?: UriReferenceString
  readonly $dynamicAnchor?: AnchorString
  readonly $vocabulary?: Vocabulary
  readonly $comment?: string
  /** @deprecated replaced by $defs */
  readonly definitions?: Record<string, Schema>
  readonly $defs?: Record<string, Schema>
}

/**
 * @category JSON-Schema Utility
 */
export const coreProperties: ReadonlyArray<keyof CoreProperties> = [
  '$id',
  '$schema',
  '$ref',
  '$anchor',
  '$recursiveRef',
  '$recursiveAnchor',
  '$dynamicRef',
  '$dynamicAnchor',
  '$vocabulary',
  '$comment',
  'definitions',
  '$defs',
] as const
