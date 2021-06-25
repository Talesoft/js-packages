export const updateIndex = <Value>(
  index: number,
  update: (value: Value) => Value,
  array: ReadonlyArray<Value>,
): ReadonlyArray<Value> =>
  array.map((itemValue, itemIndex) => (itemIndex === index ? update(itemValue) : itemValue))

export const push = <Value>(value: Value, array: ReadonlyArray<Value>): ReadonlyArray<Value> => [
  ...array,
  value,
]

export const unshift = <Value>(value: Value, array: ReadonlyArray<Value>): ReadonlyArray<Value> => [
  value,
  ...array,
]
