// json-pointer    = *( "/" reference-token )
// reference-token = *( unescaped / escaped )
// unescaped       = %x00-2E / %x30-7D / %x7F-10FFFF
//     ; %x2F ('/') and %x7E ('~') are excluded from 'unescaped'
// escaped         = "~" ( "0" / "1" )
//   ; representing '~' and '/', respectively

export type EscapeSequence = `~${0 | 1}` // ~0 = ~, ~1 = /
export type Resolved<Pointer extends string, Value> = Pointer extends ''
  ? Value
  : Pointer extends `/${infer Key}/${infer SubPath}`
  ? Resolved<`/${SubPath}`, Resolved<`/${Key}`, Value>>
  : Pointer extends `/${infer Key}`
  ? Value extends Record<Key, infer Value>
    ? Value
    : Value extends Array<infer Value>
    ? Value
    : never
  : never

export function resolveJsonPointer