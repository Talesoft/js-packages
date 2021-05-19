import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import tryCatch from '@talesoft/try-catch'
import { getJsonStorageItem, setJsonStorageItem, StorageType } from './storage'

export default function useStoredState<Value>(
  storageType: StorageType,
  key: string,
  initialValue: Value,
): [Value, Dispatch<SetStateAction<Value>>] {
  const [state, setState] = useState(() =>
    tryCatch(
      () => getJsonStorageItem<Value>(storageType, key) ?? initialValue,
      () => initialValue,
    ),
  )

  useEffect(() => {
    setJsonStorageItem(storageType, key, state)
  }, [storageType, key, state])

  return [state, setState]
}
