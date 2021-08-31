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

export type JsonPointer = string

export const resolve = <ResolvedValue>(
  pointer: JsonPointer,
  value: unknown,
): ResolvedValue | null => {
  if (pointer === '') {
    return value as ResolvedValue
  }

  if (!pointer.startsWith('/')) {
    return null
  }

  const [key, subPath] = pointer.slice(1).split('/', 2)

  if (!key) {
    return null
  }

  const normalizedKey = key.replace(/~1/g, '/').replace(/~0/g, '~')

  if (isNumeric(normalizedKey) && isArray(value)) {
    const index = toInteger(normalizedKey)
    if (index >= value.length) {
      return null
    }
    const itemValue = value[index] as ResolvedValue
    if (subPath) {
      return resolve(`/${subPath}`, itemValue)
    }
    return itemValue
  }

  if (normalizedKey && isObject(value)) {
    if (!(normalizedKey in value)) {
      return null
    }
    const itemValue = value[normalizedKey] as ResolvedValue
    if (subPath) {
      return resolve(`/${subPath}`, itemValue)
    }
    return itemValue
  }

  return null
}
