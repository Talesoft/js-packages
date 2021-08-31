import type { ReactElement } from 'react'
import { useMemo } from 'react'
import useField from './useField'
import { fromJS, List } from 'immutable'

export type FieldArrayMapHelpers<Value> = {
  readonly key: number
  readonly childName: (path: string) => string
  readonly insertBefore: (value: Value) => void
  readonly insertAfter: (value: Value) => void
  readonly remove: () => void
}

export type FieldArrayDispatchers<Value> = {
  readonly push: (...values: Value[]) => void
  readonly pop: () => void
  readonly unshift: (...values: Value[]) => void
  readonly shift: () => void
  readonly map: (mapFn: (helpers: FieldArrayMapHelpers<Value>) => ReactElement) => void
}

const isList = (value: unknown): value is List<unknown> => value instanceof List

const useFieldArray = <Value>(name: string): FieldArrayDispatchers<Value> => {
  const { immutableValue, setValue } = useField(name)

  if (!isList(immutableValue)) {
    throw new Error(
      `immutableValue needs to be a immutable.js List. ` +
        `You probably don't have an array stored in ${name}'s value`,
    )
  }

  return useMemo(
    () => ({
      push: (...values: Value[]) =>
        setValue(immutableValue.push(...values.map(value => fromJS(value)))),
      pop: () => setValue(immutableValue.pop()),
      unshift: (...values: Value[]) =>
        setValue(immutableValue.unshift(...values.map(value => fromJS(value)))),
      shift: () => setValue(immutableValue.shift()),
      insert: (key: number, value: Value) => setValue(immutableValue.insert(key, value)),
      remove: (key: number) => setValue(immutableValue.remove(key)),
      map: mapFn =>
        immutableValue.map((_0, key) => {
          const childName = (path: string) => [name, key, path].join('.')
          const insertBefore = (value: Value) => setValue(immutableValue.insert(key - 1, value))
          const insertAfter = (value: Value) => setValue(immutableValue.insert(key, value))
          const remove = () => setValue(immutableValue.remove(key))
          return mapFn({ childName, key, insertBefore, insertAfter, remove })
        }),
    }),
    [immutableValue],
  )
}

export default useFieldArray
