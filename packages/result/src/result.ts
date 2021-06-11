import type { Option } from '@talesoft/option'
import { some, none } from '@talesoft/option'

export const vocabulary = 'https://schema.tale.codes/result.json#' as const
export type Vocabulary = typeof vocabulary

type ResultMethods<Value, Error> = {
  readonly '@vocab': Vocabulary
  readonly map: <MappedValue>(
    transform: (value: Value) => MappedValue,
  ) => Result<MappedValue, Error>
  readonly mapError: <MappedError>(
    transform: (error: Error) => MappedError,
  ) => Result<Value, MappedError>
  readonly orThrow: Value
  readonly asOption: Option<Value>
  readonly asErrorOption: Option<Error>
  readonly asArray: ReadonlyArray<Value>
  readonly asErrorArray: ReadonlyArray<Error>
}

type Ok<Value> = {
  readonly '@type': 'ok'
  readonly value: Value
}

type Failure<Error> = {
  readonly '@type': 'error'
  readonly error: Error
}

export type Result<Value, Error> = (Ok<Value> | Failure<Error>) & ResultMethods<Value, Error>

export function ok<Value, Error>(value: Value): Result<Value, Error> {
  return Object.defineProperties(
    { '@vocab': vocabulary, '@type': 'ok', value },
    {
      map: {
        value: <MappedValue>(transform: (value: Value) => MappedValue) => ok(transform(value)),
      },
      mapError: { value: () => ok(value) },
      orThrow: { value },
      asOption: { get: () => some(value) },
      asErrorOption: { value: none },
      asArray: { get: () => [value] },
      asErrorArray: { get: () => [] },
    },
  )
}

export function failure<Value, Error>(error: Error): Result<Value, Error> {
  return Object.defineProperties(
    { '@vocab': vocabulary, '@type': 'failure', error },
    {
      map: { value: () => failure(error) },
      mapError: {
        value: <MappedError>(transform: (error: Error) => MappedError) => failure(transform(error)),
      },
      orThrow: {
        get: () => {
          throw error
        },
      },
      asOption: { value: none },
      asErrorOption: { get: () => some(error) },
      asArray: { get: () => [] },
      asErrorArray: { get: () => [error] },
    },
  )
}

export function fromFallible<Value, Error>(fallible: () => Value): Result<Value, Error> {
  try {
    return ok(fallible())
  } catch (error) {
    return failure(error)
  }
}
