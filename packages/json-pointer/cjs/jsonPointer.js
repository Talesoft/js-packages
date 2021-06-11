"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolve = resolve;

var _option = require("@talesoft/option");

var _types = require("@talesoft/types");

// json-pointer    = *( "/" reference-token )
// reference-token = *( unescaped / escaped )
// unescaped       = %x00-2E / %x30-7D / %x7F-10FFFF
//     ; %x2F ('/') and %x7E ('~') are excluded from 'unescaped'
// escaped         = "~" ( "0" / "1" )
//   ; representing '~' and '/', respectively
// type EscapeSequence = `~${0 | 1}` // ~0 = ~, ~1 = /
// type Resolved<Pointer extends string, Value> = Pointer extends ''
//   ? Value
//   : Pointer extends `/${infer Key}/${infer SubPath}`
//   ? Resolved<`/${SubPath}`, Resolved<`/${Key}`, Value>>
//   : Pointer extends `/${infer Key}`
//   ? Value extends Record<Key, infer Value>
//     ? Value
//     : Value extends Array<infer Value>
//     ? Value
//     : never
//   : never
function resolve(pointer, value) {
  if (!pointer.startsWith('/')) {
    return _option.none;
  }

  const [key, subPath] = pointer.slice(1).split('/', 2);

  if (!key) {
    return (0, _option.some)(value);
  }

  const normalizedKey = key.replace(/~1/g, '/').replace(/~0/g, '~');

  if ((0, _types.isNumeric)(normalizedKey) && (0, _types.isArray)(value)) {
    const index = (0, _types.toInteger)(normalizedKey);

    if (index >= value.length) {
      return _option.none;
    }

    const itemValue = value[index];

    if (subPath) {
      return resolve(`/${subPath}`, itemValue);
    }

    return (0, _option.some)(itemValue);
  }

  if (normalizedKey && (0, _types.isObject)(value)) {
    if (!(normalizedKey in value)) {
      return _option.none;
    }

    const itemValue = value[normalizedKey];

    if (subPath) {
      return resolve(`/${subPath}`, itemValue);
    }

    return (0, _option.some)(itemValue);
  }

  return _option.none;
}