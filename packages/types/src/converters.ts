export const toUndefinable = <Value>(value: Value): Value | undefined => value ?? undefined

export const toNullable = <Value>(value: Value): Value | null => value ?? null

export const toBoolean = (value: unknown): boolean => Boolean(value)

export const toString = (value: unknown): string => String(value)

export const toNumber = (value: unknown): number => Number(value)

export const toInteger = (value: unknown): number => parseInt(value as string, 10)
