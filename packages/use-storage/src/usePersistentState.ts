import { Dispatch, SetStateAction } from 'react'
import useStoredState from './useStoredState'

export default function usePersistentState<Value>(
  key: string,
  initialValue: Value,
): [Value, Dispatch<SetStateAction<Value>>] {
  return useStoredState('persistent', key, initialValue)
}
