import { isArray, isNumeric, isObject } from './common'

export function resolvePath<Path extends string>(
  path: Path,
  value: unknown,
): { path: string; value: unknown } {
  const [rawPath, fragment] = path.split('#', 2)
  if (fragment) {
    return resolvePath(fragment, resolvePath(rawPath, value))
  }
  if (!rawPath.startsWith('/')) {
    throw new Error(`Invalid JSON-Path ${path}: Path needs to start with a forward-slash (/)`)
  }
  return rawPath
    .substr(1)
    .split('/')
    .filter(Boolean)
    .reduce(
      (result, key) => {
        const path = `${result.value}/${key}`
        if (isNumeric(key) && isArray(result.value)) {
          return { ...result, path, value: result.value[parseInt(key)] }
        }
        if (isObject(result.value)) {
          return { ...result, path, value: result.value[key] }
        }
        return { ...result, value: undefined }
      },
      { path: '', value },
    )
}
