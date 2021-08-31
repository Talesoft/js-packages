export type Vector2 = {
  x: number
  y: number
}

export type ObservedVector2 = Vector2 & {
  changedProperties: (keyof Vector2)[]
}

export type ReadonlyVector2 = Readonly<Vector2>

export type Vector2Tuple = readonly [number, number]
