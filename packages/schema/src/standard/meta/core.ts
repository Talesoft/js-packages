import type { UriString, UriReferenceString, AnchorString } from './common'
import type { Schema } from './schema'

export type Vocabulary = Record<string, boolean>

export interface CoreProperties {
  readonly $id?: string
  readonly $schema?: UriString
  readonly $ref?: UriReferenceString
  readonly $anchor?: AnchorString
  /** @deprecated replaced by $dynamicRef */
  readonly $recursiveRef?: UriReferenceString
  /** @deprecated replaced by $dynamicAnchor */
  readonly $recursiveAnchor?: AnchorString
  readonly $dynamicRef?: UriReferenceString
  readonly $dynamicAnchor?: AnchorString
  readonly $vocabulary?: Vocabulary
  readonly $comment?: string
  /** @deprecated replaced by $defs */
  readonly definitions?: Record<string, Schema>
  readonly $defs?: Record<string, Schema>
}

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
