export interface Result<Value, Error> {
  readonly map: <MappedValue>(
    transform: (value: Value) => MappedValue,
  ) => Result<MappedValue, Error>
  readonly mapError: <MappedError>(
    transform: (error: Error) => MappedError,
  ) => Result<Value, MappedError>

  readonly then: <MappedValue>(
    transform: (value: Value) => Result<MappedValue, Error>,
  ) => Result<MappedValue, Error>
  readonly catch: <MappedError>(
    transform: (error: Error) => Result<Value, MappedError>,
  ) => Result<Value, MappedError>

  readonly orThrow: () => Value
}

export interface Ok<Value, Error> extends Result<Value, Error> {
  readonly value: Value
}

export interface Failure<Value, Error> extends Result<Value, Error> {
  readonly error: Error
}

function withMethods<Value>(value: Partial<Value>, methods: Partial<Value>): Value {
  Object.entries(methods).forEach(([name, method]) =>
    Object.defineProperty(value, name, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: method,
    }),
  )
  return value as Value
}

export function ok<Value, Error>(value: Value): Ok<Value, Error> {
  return withMethods<Ok<Value, Error>>(
    { value },
    {
      map: transform => ok(transform(value)),
      mapError: () => ok(value),

      then: transform => transform(value),
      catch: () => ok(value),

      orThrow: () => value,
    },
  )
}

export function failure<Value, Error>(error: Error): Failure<Value, Error> {
  return withMethods<Failure<Value, Error>>(
    { error },
    {
      map: () => failure(error),
      mapError: transform => failure(transform(error)),

      then: () => failure(error),
      catch: transform => transform(error),

      orThrow: () => {
        'hide source'
        throw error
      },
    },
  )
}
