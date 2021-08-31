export type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

export type ObservedRectangle = Rectangle & {
  changedProperties: (keyof Rectangle)[]
}

export type ReadonlyRectangle = Readonly<Rectangle>

export type RectangleTuple = readonly [number, number, number, number]
