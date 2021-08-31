import {
  parse as parseUri,
  serialize as serializeUri,
  resolve as resolveUri,
  SCHEMES,
} from 'uri-js'
import { toInteger } from '@talesoft/types'

export type Uri = string

export type UriComponents = {
  readonly scheme: string | null
  readonly userInfo: string | null
  readonly host: string | null
  readonly port: number | null
  readonly path: string | null
  readonly query: string | null
  readonly fragment: string | null
}

const id = <Value>(value: Value): Value => value
const schemeHandler = (scheme: string) => ({ scheme, parse: id, serialize: id })
const overwrittenSchemes = ['mailto', 'urn', 'ws', 'wss']
const schemeHandlers = Object.fromEntries(
  overwrittenSchemes.map(scheme => [scheme, schemeHandler(scheme)]),
)
const originalSchemeHandlers = Object.fromEntries(
  overwrittenSchemes.map(scheme => [scheme, SCHEMES[scheme]]),
)

export const parse = (uri: Uri): UriComponents => {
  // We overwrite some scheme parsing behavior in url-js (we don't want it, actually. Let this function be as predicatable as possible.)
  Object.assign(SCHEMES, schemeHandlers)
  const { scheme, userinfo, host, port, path, query, fragment, error } = parseUri(uri)
  // Assign the old behavior to url-js to not interfer with other instances using url-js directly
  Object.assign(SCHEMES, originalSchemeHandlers)

  if (error) {
    throw new Error(error)
  }

  return {
    scheme: scheme || null,
    userInfo: userinfo || null,
    host: host || null,
    port: port ? toInteger(port) : null,
    path: path || null,
    query: query || null,
    fragment: fragment || null,
  }
}

export const stringify = (uriComponents: UriComponents): string => {
  Object.assign(SCHEMES, schemeHandlers)
  const uri = serializeUri({
    scheme: uriComponents.scheme ?? undefined,
    userinfo: uriComponents.userInfo ?? undefined,
    host: uriComponents.host ?? undefined,
    port: uriComponents.port ?? undefined,
    path: uriComponents.path ?? undefined,
    query: uriComponents.query ?? undefined,
    fragment: uriComponents.fragment ?? undefined,
  })
  Object.assign(SCHEMES, originalSchemeHandlers)
  return uri
}

export const resolve = (uri: Uri, relativeUri: Uri): string => {
  Object.assign(SCHEMES, schemeHandlers)
  const result = resolveUri(uri, relativeUri)
  Object.assign(SCHEMES, originalSchemeHandlers)
  return result
}
