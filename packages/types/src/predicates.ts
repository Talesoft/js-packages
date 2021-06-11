export function negate(predicate: (value: unknown) => boolean): (value: unknown) => boolean {
  return (value: unknown) => !predicate(value)
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

export function isNull(value: unknown): value is null {
  return value === null
}

export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Math.floor(value) === value
}

export function isNumeric(value: unknown): value is string | number {
  return !isNaN(parseFloat(String(value))) && isFinite(Number(value))
}

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isFunction(value: unknown): value is Record<string, unknown> {
  return typeof value === 'function'
}
