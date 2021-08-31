import type { Vector2 } from './vector2'

export const isVector2 = (value: unknown): value is Vector2 =>
  typeof value === 'object' && value !== null && 'x' in value && 'y' in value
export const equals = (vec2: Vector2, otherVec2: Vector2): boolean =>
  otherVec2.x === vec2.x && otherVec2.y === vec2.y
export const isZero = (vec2: Vector2): boolean => vec2.x === 0 && vec2.y === 0
export const isOne = (vec2: Vector2): boolean => vec2.x === 1 && vec2.y === 1
