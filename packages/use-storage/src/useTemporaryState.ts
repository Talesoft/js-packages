import { Dispatch, SetStateAction } from 'react'
import useStoredState from './useStoredState'

export default function useTemporaryState<Value>(
  key: string,
  initialValue: Value,
): [Value, Dispatch<SetStateAction<Value>>] {
  return useStoredState('temporary', key, initialValue)
}
