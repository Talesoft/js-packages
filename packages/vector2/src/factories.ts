import type { ObservedVector2, Vector2 } from './vector2'
import type { ReadonlyVector2, Vector2Tuple } from './vector2'

export const create = (x = 0, y = 0): Vector2 => ({ x, y })
export const createObserved = (x = 0, y = 0): ObservedVector2 =>
  new Proxy<ObservedVector2>(
    { x, y, changedProperties: [] },
    {
      set: (target, propertyKey: keyof Vector2) => {
        target.changedProperties.push(propertyKey)
        return true
      },
    },
  )
export const createImmutable = (x = 0, y = 0): ReadonlyVector2 => Object.freeze({ x, y })
export const toMutable = (vec2: Vector2): Vector2 => create(vec2.x, vec2.y)
export const toImmutable = (vec2: Vector2): ReadonlyVector2 => createImmutable(vec2.x, vec2.y)

export const createTuple = (x = 0, y = 0): Vector2Tuple => Object.freeze([x, y] as Vector2Tuple)
export const fromTuple = ([x, y]: Vector2Tuple): Vector2 => create(x, y)
export const observedFromTuple = ([x, y]: Vector2Tuple): Vector2 => createObserved(x, y)
export const immutableFromTuple = ([x, y]: Vector2Tuple): Vector2 => createImmutable(x, y)
export const toTuple = (vec2: Vector2): Vector2Tuple => createTuple(vec2.x, vec2.y)
