import type { ObservedVector2, Vector2 } from './vector2'
import { down, left, right, up } from './constants'
import { toMutable } from './factories'

export const getSquaredLength = (vec2: Vector2): number => vec2.x * vec2.x + vec2.y * vec2.y
export const getLength = (vec2: Vector2): number => Math.sqrt(getSquaredLength(vec2))

export const getDotProduct = (vec2: Vector2, target: Vector2): number =>
  vec2.x * target.x + vec2.y * target.y

export const getAngleTo = (vec2: Vector2, target: Vector2, maxDelta = 0.001): number => {
  const denominator = Math.sqrt(getSquaredLength(vec2) * getSquaredLength(target))
  if (denominator < maxDelta) {
    return 0
  }
  const dot = Math.max(-1, Math.min(getDotProduct(target, vec2) / denominator, 1))
  return Math.acos(dot)
}

export const getDistanceTo = (vec2: Vector2, target: Vector2): number => {
  const toVec2 = toMutable(vec2)
  subtract(toVec2, target)
  return getLength(toVec2)
}

export const set = (vec2: Vector2, x: number, y: number): void => {
  vec2.x = x
  vec2.y = y
}

export const copy = (vec2: Vector2, source: Vector2): void => {
  vec2.x = source.x
  vec2.y = source.y
}

export const add = (vec2: Vector2, { x = 0, y = 0 }: Partial<Vector2>): void => {
  vec2.x += x
  vec2.y += y
}

export const subtract = (vec2: Vector2, { x = 0, y = 0 }: Partial<Vector2>): void => {
  vec2.x -= x
  vec2.y -= y
}

export const multiply = (vec2: Vector2, { x = 1, y = 1 }: Partial<Vector2>): void => {
  vec2.x *= x
  vec2.y *= y
}

export const divide = (vec2: Vector2, { x = 1, y = 1 }: Partial<Vector2>): void => {
  vec2.x /= x
  vec2.y /= y
}

export const scale = (vec2: Vector2, value: number): void => {
  vec2.x *= value
  vec2.y *= value
}

export const half = (vec2: Vector2): void => scale(vec2, 0.5)
export const double = (vec2: Vector2): void => scale(vec2, 2)
export const triple = (vec2: Vector2): void => scale(vec2, 3)
export const negate = (vec2: Vector2): void => {
  vec2.x = -vec2.x
  vec2.y = -vec2.y
}

export const min = (vec2: Vector2, { x = Infinity, y = Infinity }: Partial<Vector2>): void => {
  vec2.x = Math.min(vec2.x, x)
  vec2.y = Math.min(vec2.y, y)
}

export const max = (vec2: Vector2, { x = -Infinity, y = -Infinity }: Partial<Vector2>): void => {
  vec2.x = Math.max(vec2.x, x)
  vec2.y = Math.max(vec2.y, y)
}

export const clamp = (vec2: Vector2, minValue: number, maxValue: number): void => {
  vec2.x = Math.max(minValue, Math.min(vec2.x, maxValue))
  vec2.y = Math.max(minValue, Math.min(vec2.y, maxValue))
}

export const clamp01 = (vec2: Vector2): void => clamp(vec2, 0, 1)

export const normalize = (vec2: Vector2): void => {
  const mag = getLength(vec2)
  if (mag !== 0) {
    vec2.x /= mag
    vec2.y /= mag
  }
}

export const interpolate = (vec2: Vector2, target: Vector2, t: number): void => {
  interpolateUnclamped(vec2, target, Math.max(0, Math.min(t, 1)))
}

export const interpolateUnclamped = (vec2: Vector2, target: Vector2, t: number): void => {
  vec2.x = vec2.x + (target.x - vec2.x) * t
  vec2.y = vec2.y + (target.y - vec2.y) * t
}

export const perpendicular = (vec2: Vector2): void => {
  const { x } = vec2
  vec2.x = vec2.y
  vec2.y = -x
}

export const moveTowards = (vec2: Vector2, target: Vector2, maxDelta = 0.001): void => {
  const toVec2 = toMutable(vec2)
  subtract(toVec2, target)
  const distance = getLength(toVec2)
  if (distance <= maxDelta || distance === 0) {
    return
  }
  const divisor = distance * maxDelta
  vec2.x = (vec2.x + toVec2.x) / divisor
  vec2.y = (vec2.y + toVec2.y) / divisor
}

export const move = (vec2: Vector2, direction: Vector2, length = 1): void => {
  const movement = toMutable(direction)
  scale(movement, length)
  add(vec2, movement)
}

export const moveLeft = (vec2: Vector2, amount = 1): void => move(vec2, left, amount)
export const moveUp = (vec2: Vector2, amount = 1): void => move(vec2, up, amount)
export const moveRight = (vec2: Vector2, amount = 1): void => move(vec2, right, amount)
export const moveDown = (vec2: Vector2, amount = 1): void => move(vec2, down, amount)

export const clearChanges = (vec2: ObservedVector2): void => {
  vec2.changedProperties.splice(0, vec2.changedProperties.length)
}
