export type JsonPointerString = string

export const outputTypes = ['flag', 'basic', 'detailed', 'verbose'] as const

export type OutputType = typeof outputTypes[number]

export interface FlagOutput {
  readonly valid: boolean
}

export interface OutputUnit extends FlagOutput {
  readonly keywordLocation: JsonPointerString
  readonly absoluteKeywordLocation?: JsonPointerString
  readonly instanceLocation: JsonPointerString
  readonly error?: string
  readonly errors?: ReadonlyArray<OutputUnit>
  readonly annotations?: ReadonlyArray<OutputUnit>
}

export type BasicOutput = OutputUnit
export type DetailedOutput = OutputUnit
export type VerboseOutput = OutputUnit

export type Output = FlagOutput | BasicOutput | DetailedOutput | VerboseOutput
