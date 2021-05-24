@talesoft/use-storage
=====================

A wrapper including fallbacks over localStorage and sessionStorage.

Consumed as a react hook.

Other storage kinds might be supported in the future.

Usage
=====

`usePersistentState<Value>(key: string, defaultValue: Value): [Value, Dispatch<SetStateAction<Value>>]`

A wrapper over `localStorage`. Falls back to a pure memory storage.

```ts
import { usePersistentState } from '@talesoft/use-storage'

export function MyComponent() {
  const [token, setToken] = usePersistentState('authToken', undefined)

  const onSubmit = async () => {

    setToken(await login())
  }

  return (
    <.../>
  )
}
```

`useTemporaryState<Value>(key: string, defaultValue: Value): [Value, Dispatch<SetStateAction<Value>>]`

A wrapper over `sessionStorage`. Falls back to a pure memory storage.

```ts
import { useTemporaryState } from '@talesoft/use-storage'

export function MyComponent() {
  const [soundDisabled, setSoundDisabled] = useTemporaryState('soundDisabled', false)

  const onDisableSound = () => {

    setSoundDisabled(true)
  }

  return (
    <.../>
  )
}
```

`useMemoryState<Value>(key: string, defaultValue: Value): [Value, Dispatch<SetStateAction<Value>>]`

A simple in-memory storage. Poor-mans contexts, basically.

```ts
import { useMemoryState } from '@talesoft/use-storage'

export function MyComponent() {
  const [currentUser, setCurrentUser] = useMemoryState('currentUser', undefined)

  const onLogin = () => {

    setCurrentUser(await fetchUser())
  }

  return (
    <.../>
  )
}
```

