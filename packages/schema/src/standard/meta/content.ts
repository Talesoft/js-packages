import type { Schema } from './schema'

export type ContentProperties = {
  readonly contentEncoding?: string
  readonly contentMediaType?: string
  readonly contentSchema?: Schema
}

export const contentProperties = ['contentEncoding', 'contentMediaType', 'contentSchema'] as const
