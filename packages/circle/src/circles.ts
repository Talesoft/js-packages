export type Circle = {
  cx: number
  cy: number
  radius: number
}

export type ObservedCircle = Circle & {
  changedProperties: (keyof Circle)[]
}

export type ReadonlyCircle = Readonly<Circle>

export type CircleTuple = readonly [number, number, number]
