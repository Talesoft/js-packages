export function toUndefinable<Value>(value: Value): Value | undefined {
  return value || undefined
}

export function toNullable<Value>(value: Value): Value | null {
  return value || null
}

export function toBoolean(value: unknown): boolean {
  return Boolean(value)
}

export function toString(value: unknown): string {
  return String(value)
}

export function toNumber(value: unknown): number {
  return Number(value)
}

export function toInteger(value: unknown): number {
  return parseInt(value as string)
}
