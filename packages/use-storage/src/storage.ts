export type StorageType = 'memory' | 'persistent' | 'temporary'

const storages: Record<StorageType, Record<string, string>> = {
  memory: {},
  persistent: {},
  temporary: {},
}

export function getStorageItem(type: StorageType, key: string): string | undefined {
  switch (type) {
    case 'memory': {
      return storages.memory[key]
    }
    case 'persistent': {
      if ('localStorage' in globalThis) {
        return globalThis.localStorage.getItem(key) ?? undefined
      }
      return storages.persistent[key]
    }
    case 'temporary': {
      if ('sessionStorage' in globalThis) {
        return globalThis.sessionStorage.getItem(key) ?? undefined
      }
      return storages.temporary[key]
    }
  }
}

export function getJsonStorageItem<Value>(type: StorageType, key: string): Value | undefined {
  const value = getStorageItem(type, key)
  if (value === undefined) {
    return undefined
  }
  return JSON.parse(value) as Value
}

export function setStorageItem(type: StorageType, key: string, value: string): void {
  switch (type) {
    case 'memory': {
      storages.memory[key] = value
      break
    }
    case 'persistent': {
      if ('localStorage' in globalThis) {
        globalThis.localStorage.setItem(key, value)
      }
      storages.persistent[key] = value
      break
    }
    case 'temporary': {
      if ('sessionStorage' in globalThis) {
        globalThis.sessionStorage.getItem(key), value
      }
      storages.temporary[key] = value
      break
    }
  }
}

export function setJsonStorageItem<Value>(type: StorageType, key: string, value: Value): void {
  return setStorageItem(type, key, JSON.stringify(value))
}
