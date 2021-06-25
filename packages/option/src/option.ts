export const vocabulary = 'https://schema.tale.codes/option.json#' as const
export type Vocabulary = typeof vocabulary

type OptionMethods<Value> = {
  readonly '@vocab': Vocabulary
  readonly map: <MappedValue>(transform: (value: Value) => MappedValue) => Option<MappedValue>
  readonly orUndefined: Value | undefined
  readonly orNull: Value | null
  readonly asArray: ReadonlyArray<Value>
}

type Some<Value> = {
  readonly '@type': 'some'
  readonly value: Value
} & OptionMethods<Value>

type None = {
  readonly '@type': 'none'
} & OptionMethods<never>

export type Option<Value> = Some<Value> | None

export function some<Value>(value: Value): Some<Value> {
  return Object.defineProperties(
    { '@vocab': vocabulary, '@type': 'some', value },
    {
      map: {
        value: <MappedValue>(transform: (value: Value) => MappedValue) => some(transform(value)),
      },
      orUndefined: { value },
      orNull: { value },
      asArray: { get: () => [value] },
    },
  ) as Some<Value>
}

export const none: None = Object.defineProperties(
  { '@vocab': vocabulary, '@type': 'none' },
  {
    map: { value: () => none },
    orUndefined: { value: undefined },
    orNull: { value: null },
    asArray: { value: [] },
  },
) as None

export function fromPredicate<Value>(
  predicate: (value: Value) => boolean,
  value: Value,
): Option<Value> {
  return predicate(value) ? some(value) : none
}

export function fromNullable<Value>(value: Value | undefined | null): Option<Value> {
  return fromPredicate(value => value !== null && value !== undefined, value as Value)
}

export function fromFalsible<Value>(
  value: Value | undefined | null | false | 0 | '',
): Option<Value> {
  return fromPredicate(Boolean, value as Value)
}
