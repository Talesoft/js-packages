import type { Reference } from '@talesoft/schema'
import type { StatusCode } from './common'
import type { Link } from './links'
import type { MediaType } from './mediaTypes'
import type { Header } from './parameters'

export interface Response {
  /**
   * A short description of the response. CommonMark syntax MAY be used for rich text representation.
   */
  description: string
  /**
   * Maps a header name to its definition. RFC7230 states header names are case insensitive. If a response header is defined with the name "Content-Type", it SHALL be ignored.
   */
  headers?: Record<string, Header | Reference>
  /**
   * A map containing descriptions of potential response payloads. The key is a media type or media type range and the value describes it. For responses that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*
   */
  content?: Record<string, MediaType>
  /**
   * A map of operations links that can be followed from the response. The key of the map is a short name for the link, following the naming constraints of the names for Comp
   */
  links?: Record<string, Link | Reference>
}

export type Responses = Record<StatusCode | 'default', Response>
