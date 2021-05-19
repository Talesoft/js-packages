import { Dispatch, SetStateAction } from 'react'
import useStoredState from './useStoredState'

export default function useMemoryState<Value>(
  key: string,
  initialValue: Value,
): [Value, Dispatch<SetStateAction<Value>>] {
  return useStoredState('memory', key, initialValue)
}
