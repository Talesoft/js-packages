import type { Vector2 } from '@talesoft/vector2'
import type { Line, ObservedLine } from './lines'
import * as vector2 from '@talesoft/vector2'

export const getLength = (line: Line): number =>
  // We could use vector2.getDistanceTo, but it involves another object creation
  vector2.getLength({ x: line.fromX - line.toX, y: line.fromY - line.toY })

export const getFrom = (line: Line): Vector2 => ({ x: line.fromX, y: line.fromY })
export const getTo = (line: Line): Vector2 => ({ x: line.toX, y: line.toY })

export const getVertices = (line: Line): Vector2[] => [getFrom(line), getTo(line)]

export const getDotProduct = (line: Line): number => line.fromX * line.toX + line.fromY + line.toY

export const getCenter = (line: Line): Vector2 => {
  const from = getFrom(line)
  vector2.add(from, getTo(line))
  vector2.half(from)
  return from
}

export const getNormal = (line: Line): Vector2 => {
  const from = getFrom(line)
  vector2.subtract(from, getTo(line))
  vector2.perpendicular(from)
  vector2.normalize(from)
  return from
}

export const getAngle = (line: Line, maxDelta = 0.001): number =>
  vector2.getAngleTo(getFrom(line), getTo(line), maxDelta)

export const set = (line: Line, fromX: number, fromY: number, toX: number, toY: number): void => {
  line.fromX = fromX
  line.fromY = fromY
  line.toX = toX
  line.toY = toY
}

export const setFrom = (line: Line, { x = line.fromX, y = line.fromY }: Partial<Vector2>): void => {
  line.fromX = x
  line.fromY = y
}

export const setTo = (line: Line, { x = line.toX, y = line.toY }: Partial<Vector2>): void => {
  line.toX = x
  line.toY = y
}

export const setFromAndTo = (line: Line, from: Vector2, to: Vector2): void => {
  setFrom(line, from)
  setTo(line, to)
}

export const copy = (line: Line, source: Line): void => {
  line.fromX = source.fromX
  line.fromY = source.fromY
  line.toX = source.toX
  line.toY = source.toY
}

export const mutateFrom = (line: Line, mutator: (from: Vector2) => void): void => {
  const from = getFrom(line)
  mutator(from)
  setFrom(line, from)
}

export const mutateTo = (line: Line, mutator: (to: Vector2) => void): void => {
  const to = getFrom(line)
  mutator(to)
  setTo(line, to)
}

export const mutateFromAndTo = (
  line: Line,
  mutator: (from: Vector2, to: Vector2) => void,
): void => {
  const from = getFrom(line)
  const to = getTo(line)
  mutator(from, to)
  setFromAndTo(line, from, to)
}

export const add = (
  line: Line,
  { fromX = 0, fromY = 0, toX = 0, toY = 0 }: Partial<Line>,
): void => {
  line.fromX += fromX
  line.fromY += fromY
  line.toX += toX
  line.toY += toY
}

export const subtract = (
  line: Line,
  { fromX = 0, fromY = 0, toX = 0, toY = 0 }: Partial<Line>,
): void => {
  line.fromX -= fromX
  line.fromY -= fromY
  line.toX -= toX
  line.toY -= toY
}

export const multiply = (
  line: Line,
  { fromX = 1, fromY = 1, toX = 1, toY = 1 }: Partial<Line>,
): void => {
  line.fromX *= fromX
  line.fromY *= fromY
  line.toX *= toX
  line.toY *= toY
}

export const divide = (
  line: Line,
  { fromX = 1, fromY = 1, toX = 1, toY = 1 }: Partial<Line>,
): void => {
  line.fromX /= fromX
  line.fromY /= fromY
  line.toX /= toX
  line.toY /= toY
}

export const scale = (line: Line, value: number): void => {
  line.fromX *= value
  line.fromY *= value
  line.toX *= value
  line.toY *= value
}

export const interpolate = (line: Line, t: number): Vector2 => {
  const from = getFrom(line)
  vector2.interpolate(from, getTo(line), t)
  return from
}

export const interpolateUnclamped = (line: Line, t: number): Vector2 => {
  const from = getFrom(line)
  vector2.interpolateUnclamped(from, getTo(line), t)
  return from
}

export const clearChanges = (line: ObservedLine): void => {
  line.changedProperties.splice(0, line.changedProperties.length)
}

const intersectLines = (line: Line, otherLine: Line, isRay: boolean): Vector2 | null => {
  const dx1 = line.toX - line.fromX
  const dy1 = line.toY - line.fromY
  const dx2 = line.fromX - otherLine.fromX
  const dy2 = line.fromY - otherLine.fromY
  const dx3 = otherLine.toX - otherLine.fromX
  const dy3 = otherLine.toY - otherLine.fromY
  if (dy1 / dx1 === dy3 / dx3) {
    return null
  }
  const d = dx1 * dy3 - dy1 * dx3
  if (d === 0) {
    return null
  }
  const r = (dy2 * dx3 - dx2 * dy3) / d
  const s = (dy2 * dx1 - dx2 * dy1) / d
  if (r >= 0 && (isRay || r <= 1) && s >= 0 && s <= 1) {
    return {
      x: line.fromX + r * dx1,
      y: line.fromY + r * dy1,
    }
  }
  return null
}

export const intersect = (line: Line, otherLine: Line): Vector2 | null =>
  intersectLines(line, otherLine, false)

export const castRay = (ray: Line, otherLine: Line): Vector2 | null =>
  intersectLines(ray, otherLine, true)
