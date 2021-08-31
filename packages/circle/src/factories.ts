import type { Vector2 } from '@talesoft/vector2'
import type { Circle, CircleTuple, ObservedCircle, ReadonlyCircle } from './circles'

export const create = (cx = 0, cy = 0, radius = 0): Circle => ({
  cx,
  cy,
  radius,
})
export const createFromCenter = (center: Vector2, radius: number): Circle =>
  create(center.x, center.y, radius)
export const createObserved = (cx = 0, cy = 0, radius = 0): ObservedCircle =>
  new Proxy<ObservedCircle>(
    { cx, cy, radius, changedProperties: [] },
    {
      set: (target, propertyKey: keyof Circle) => {
        target.changedProperties.push(propertyKey)
        return true
      },
    },
  )
export const createObservedFromCenter = (center: Vector2, radius: number): Circle =>
  createObserved(center.x, center.y, radius)
export const createImmutable = (cx = 0, cy = 0, radius = 0): ReadonlyCircle =>
  Object.freeze({ cx, cy, radius })
export const createImmutableFromCenter = (center: Vector2, radius: number): Circle =>
  createImmutable(center.x, center.y, radius)
export const toMutable = (circle: Circle): Circle => create(circle.cx, circle.cy, circle.radius)
export const toImmutable = (circle: Circle): ReadonlyCircle =>
  createImmutable(circle.cx, circle.cy, circle.radius)

export const createTuple = (cx = 0, cy = 0, radius = 0): CircleTuple =>
  Object.freeze([cx, cy, radius] as CircleTuple)
export const createTupleFromCenter = (center: Vector2, radius: number): CircleTuple =>
  Object.freeze([center.x, center.y, radius] as CircleTuple)
export const fromTuple = ([cx, cy, radius]: CircleTuple): Circle => create(cx, cy, radius)
export const observedFromTuple = ([cx, cy, radius]: CircleTuple): ReadonlyCircle =>
  createObserved(cx, cy, radius)
export const immutableFromTuple = ([cx, cy, radius]: CircleTuple): ReadonlyCircle =>
  createImmutable(cx, cy, radius)
export const toTuple = (circle: Circle): CircleTuple =>
  createTuple(circle.cx, circle.cy, circle.radius)
