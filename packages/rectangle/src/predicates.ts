import type { Vector2 } from '../../vector2/esm'
import type { Rectangle } from './rectangles'

export const isRectangle = (value: unknown): value is Rectangle =>
  typeof value === 'object' &&
  value !== null &&
  'x' in value &&
  'y' in value &&
  'width' in value &&
  'height' in value
export const equals = (rect: Rectangle, otherRect: Rectangle): boolean =>
  otherRect.x === otherRect.x &&
  rect.y === otherRect.y &&
  rect.width === otherRect.width &&
  rect.height === otherRect.height
export const isZero = (rect: Rectangle): boolean =>
  rect.x === 0 && rect.y === 0 && rect.width === 0 && rect.height === 0

export const contains = (rect: Rectangle, vec2: Vector2): boolean =>
  vec2.x >= rect.x &&
  vec2.x < rect.x + rect.width &&
  vec2.y >= rect.y &&
  vec2.y < rect.y + rect.height
