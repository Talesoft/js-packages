import type { Option } from '@talesoft/option'
import { some, none } from '@talesoft/option'
import { isObject, isArray, isNumeric, toInteger } from '@talesoft/types'

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

export function resolve<ResolvedValue>(pointer: string, value: unknown): Option<ResolvedValue> {
  if (pointer === '') {
    return some(value as ResolvedValue)
  }

  if (!pointer.startsWith('/')) {
    return none
  }

  const [key, subPath] = pointer.slice(1).split('/', 2)

  if (!key) {
    return none
  }

  const normalizedKey = key.replace(/~1/g, '/').replace(/~0/g, '~')

  if (isNumeric(normalizedKey) && isArray(value)) {
    const index = toInteger(normalizedKey)
    if (index >= value.length) {
      return none
    }
    const itemValue = value[index] as ResolvedValue
    if (subPath) {
      return resolve(`/${subPath}`, itemValue)
    }
    return some(itemValue)
  }

  if (normalizedKey && isObject(value)) {
    if (!(normalizedKey in value)) {
      return none
    }
    const itemValue = value[normalizedKey] as ResolvedValue
    if (subPath) {
      return resolve(`/${subPath}`, itemValue)
    }
    return some(itemValue)
  }

  return none
}
