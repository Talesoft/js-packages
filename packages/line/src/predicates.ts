import type { Line } from './lines'

export const isLine = (value: unknown): value is Line =>
  typeof value === 'object' &&
  value !== null &&
  'fromX' in value &&
  'fromY' in value &&
  'toX' in value &&
  'toY' in value
export const equals = (line: Line, otherLine: Line): boolean =>
  otherLine.fromX === otherLine.fromX &&
  line.fromY === otherLine.fromY &&
  line.toX === otherLine.toX &&
  line.toY === otherLine.toY
export const isZero = (line: Line): boolean =>
  line.fromX === 0 && line.fromY === 0 && line.toX === 0 && line.toY === 0
