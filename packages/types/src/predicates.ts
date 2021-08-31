export const isUndefined = (value: unknown): value is undefined => value === undefined

export const isNull = (value: unknown): value is null => value === null

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || value === undefined

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

export const isString = (value: unknown): value is string => typeof value === 'string'

export const isNumber = (value: unknown): value is number => typeof value === 'number'

export const isInteger = (value: unknown): value is number =>
  typeof value === 'number' && Math.floor(value) === value

export const isNumeric = (value: unknown): value is string | number =>
  !isNaN(parseFloat(String(value))) && isFinite(Number(value))

export const isArray = (value: unknown): value is Array<unknown> => Array.isArray(value)

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown =>
  typeof value === 'function'
