import type { Record, Map } from 'immutable'
import { useEffect } from 'react'
import useFormContext from '../forms/useFormContext'
import { isImmutable, fromJS } from 'immutable'

export type UseFieldResult<Value> = {
  readonly immutableValue: Record<Value> | Map<string, Value> | Value
  readonly value: Value
  readonly setValue: (newValue: Value) => void
}

const useField = <Value>(path: string): UseFieldResult<Value> => {
  const { registerField, unregisterField, getFieldValue, setFieldValue } = useFormContext()

  useEffect(() => {
    registerField(path)
    return () => unregisterField(path)
  }, [path])

  const immutableValue = getFieldValue<Value>(path)
  return {
    immutableValue,
    get value() {
      return (isImmutable(immutableValue) ? immutableValue.toJS() : immutableValue) as Value
    },
    setValue: newValue => setFieldValue(path, fromJS(newValue)),
  }
}

export default useField
