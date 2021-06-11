"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.stringify = stringify;
exports.resolve = resolve;

var _result = require("@talesoft/result");

var _option = require("@talesoft/option");

var _uriJs = require("uri-js");

var _types = require("@talesoft/types");

const id = value => value;

const schemeHandler = scheme => ({
  scheme,
  parse: id,
  serialize: id
});

const overwrittenSchemes = ['mailto', 'urn', 'ws', 'wss'];
const schemeHandlers = Object.fromEntries(overwrittenSchemes.map(scheme => [scheme, schemeHandler(scheme)]));
const originalSchemeHandlers = Object.fromEntries(overwrittenSchemes.map(scheme => [scheme, _uriJs.SCHEMES[scheme]]));

function parse(uri) {
  return (0, _result.fromFallible)(() => {
    // We overwrite some scheme parsing behavior in url-js (we don't want it, actually. Let this function be as predicatable as possible.)
    Object.assign(_uriJs.SCHEMES, schemeHandlers);
    const {
      scheme,
      userinfo,
      host,
      port,
      path,
      query,
      fragment,
      error
    } = (0, _uriJs.parse)(uri); // Assign the old behavior to url-js to not interfer with other instances using url-js directly

    Object.assign(_uriJs.SCHEMES, originalSchemeHandlers);

    if (error) {
      throw new Error(error);
    }

    return {
      scheme: (0, _option.fromFalsible)(scheme),
      userInfo: (0, _option.fromFalsible)(userinfo),
      host: (0, _option.fromFalsible)(host),
      port: (0, _option.fromFalsible)(port).map(_types.toInteger),
      path: (0, _option.fromFalsible)(path),
      query: (0, _option.fromFalsible)(query),
      fragment: (0, _option.fromFalsible)(fragment)
    };
  });
}

function stringify(uriComponents) {
  Object.assign(_uriJs.SCHEMES, schemeHandlers);
  const uri = (0, _uriJs.serialize)({
    scheme: uriComponents.scheme.orUndefined,
    userinfo: uriComponents.userInfo.orUndefined,
    host: uriComponents.host.orUndefined,
    port: uriComponents.port.orUndefined,
    path: uriComponents.path.orUndefined,
    query: uriComponents.query.orUndefined,
    fragment: uriComponents.fragment.orUndefined
  });
  Object.assign(_uriJs.SCHEMES, originalSchemeHandlers);
  return uri;
}

function resolve(uri, relativeUri) {
  Object.assign(_uriJs.SCHEMES, schemeHandlers);
  const result = (0, _uriJs.resolve)(uri, relativeUri);
  Object.assign(_uriJs.SCHEMES, originalSchemeHandlers);
  return result;
}