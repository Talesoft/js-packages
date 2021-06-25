export const setKey = <Value, Key extends keyof Value>(
  key: Key,
  keyValue: Value[Key],
  value: Value,
): Value => ({ ...value, [key]: keyValue })

export const updateKey = <Value, Key extends keyof Value>(
  key: Key,
  update: (value: Value[Key]) => Value[Key],
  value: Value,
): Value => setKey(key, update(value[key]), value)

export type RemovableKeys<Value> = {
  [Key in keyof Value]: Omit<Value, Key> extends Value ? Key : never
}[keyof Value]

export const removeKey = <Value, Key extends keyof RemovableKeys<Value>>(
  key: Key,
  value: Value,
): Value =>
  Object.fromEntries(Object.entries(value).filter(([, valueKey]) => valueKey !== key)) as Value
