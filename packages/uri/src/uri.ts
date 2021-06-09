import type { Result } from '@talesoft/result'
import type { URIComponents } from 'uri-js'
import { failure, ok } from '@talesoft/result'
import {
  parse as parseUri,
  serialize as serializeUri,
  resolve as resolveUri,
  SCHEMES,
} from 'uri-js'

export type Uri = string

export interface UriComponents {
  scheme?: string
  userInfo?: string
  host?: string
  port?: number
  path?: string
  query?: string
  fragment?: string
}

const id = (value: URIComponents) => value
const schemeHandler = (scheme: string) => ({ scheme, parse: id, serialize: id })
const overwrittenSchemes = ['mailto', 'urn', 'ws', 'wss']
const schemeHandlers = Object.fromEntries(
  overwrittenSchemes.map(scheme => [scheme, schemeHandler(scheme)]),
)
const originalSchemeHandlers = Object.fromEntries(
  overwrittenSchemes.map(scheme => [scheme, SCHEMES[scheme]]),
)

export function parse(uri: Uri): Result<UriComponents, Error> {
  try {
    // We overwrite some scheme parsing behavior in url-js (we don't want it, actually. Let this function be as predicatable as possible.)
    Object.assign(SCHEMES, schemeHandlers)
    const { scheme, userinfo, host, port, path, query, fragment, error } = parseUri(uri)
    // Assign the old behavior to url-js to not interfer with other instances using url-js directly
    Object.assign(SCHEMES, originalSchemeHandlers)

    if (error) {
      return failure(new Error(error))
    }

    return ok({
      ...(scheme ? { scheme } : undefined),
      ...(userinfo ? { userInfo: userinfo } : undefined),
      ...(host ? { host } : undefined),
      ...(port ? { port: parseInt(port.toString()) } : undefined),
      ...(path ? { path: path } : undefined),
      ...(query ? { query: query } : undefined),
      ...(fragment ? { fragment: fragment } : undefined),
    })
  } catch (error) {
    return failure(error)
  }
}

export function stringify(uriComponents: UriComponents): string {
  Object.assign(SCHEMES, schemeHandlers)
  const uriString = serializeUri({
    scheme: uriComponents.scheme,
    userinfo: uriComponents.userInfo,
    host: uriComponents.host,
    port: uriComponents.port,
    path: uriComponents.path,
    query: uriComponents.query,
    fragment: uriComponents.fragment,
  })
  Object.assign(SCHEMES, originalSchemeHandlers)
  return uriString
}

export function resolve(uri: Uri, relativeUri: Uri): Uri {
  return resolveUri(uri, relativeUri)
}
