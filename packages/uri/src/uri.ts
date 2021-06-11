import type { Result } from '@talesoft/result'
import type { Option } from '@talesoft/option'
import type { URIComponents } from 'uri-js'
import { fromFallible } from '@talesoft/result'
import { fromFalsible } from '@talesoft/option'
import {
  parse as parseUri,
  serialize as serializeUri,
  resolve as resolveUri,
  SCHEMES,
} from 'uri-js'
import { toInteger } from '@talesoft/types'

export type Uri = string

export type UriComponents = {
  scheme: Option<string>
  userInfo: Option<string>
  host: Option<string>
  port: Option<number>
  path: Option<string>
  query: Option<string>
  fragment: Option<string>
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
  return fromFallible(() => {
    // We overwrite some scheme parsing behavior in url-js (we don't want it, actually. Let this function be as predicatable as possible.)
    Object.assign(SCHEMES, schemeHandlers)
    const { scheme, userinfo, host, port, path, query, fragment, error } = parseUri(uri)
    // Assign the old behavior to url-js to not interfer with other instances using url-js directly
    Object.assign(SCHEMES, originalSchemeHandlers)

    if (error) {
      throw new Error(error)
    }

    return {
      scheme: fromFalsible(scheme),
      userInfo: fromFalsible(userinfo),
      host: fromFalsible(host),
      port: fromFalsible(port).map(toInteger),
      path: fromFalsible(path),
      query: fromFalsible(query),
      fragment: fromFalsible(fragment),
    }
  })
}

export function stringify(uriComponents: UriComponents): string {
  Object.assign(SCHEMES, schemeHandlers)
  const uri = serializeUri({
    scheme: uriComponents.scheme.orUndefined,
    userinfo: uriComponents.userInfo.orUndefined,
    host: uriComponents.host.orUndefined,
    port: uriComponents.port.orUndefined,
    path: uriComponents.path.orUndefined,
    query: uriComponents.query.orUndefined,
    fragment: uriComponents.fragment.orUndefined,
  })
  Object.assign(SCHEMES, originalSchemeHandlers)
  return uri
}

export function resolve(uri: Uri, relativeUri: Uri): Uri {
  Object.assign(SCHEMES, schemeHandlers)
  const result = resolveUri(uri, relativeUri)
  Object.assign(SCHEMES, originalSchemeHandlers)
  return result
}
