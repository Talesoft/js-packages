import type { Vector2 } from '../../vector2/esm'

export type Line = {
  fromX: number
  fromY: number
  toX: number
  toY: number
}

export type ObservedLine = Line & {
  changedProperties: (keyof Line)[]
}

export type ReadonlyLine = Readonly<Line>

export type LineTuple = readonly [number, number, number, number]

export type LineIntersection = Vector2 | null
