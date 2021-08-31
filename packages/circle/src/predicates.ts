import type { Vector2 } from '../../vector2/esm'
import type { Circle } from './circles'

export const isCircle = (value: unknown): value is Circle =>
  typeof value === 'object' && value !== null && 'cx' in value && 'cy' in value && 'radius' in value
export const equals = (circle: Circle, otherCircle: Circle): boolean =>
  otherCircle.cx === otherCircle.cx &&
  circle.cy === otherCircle.cy &&
  circle.radius === otherCircle.radius
export const isZero = (circle: Circle): boolean =>
  circle.cx === 0 && circle.cy === 0 && circle.radius === 0

export const contains = (circle: Circle, vec2: Vector2): boolean =>
  Math.sqrt(
    (vec2.x - circle.cx) * (vec2.x - circle.cx) + (vec2.y - circle.cy) * (vec2.y - circle.cy),
  ) < circle.radius
