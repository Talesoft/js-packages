import type { Vector2 } from '@talesoft/vector2'
import type { Line, LineTuple, ObservedLine, ReadonlyLine } from './lines'
import * as vector2 from '@talesoft/vector2'

export const create = (fromX = 0, fromY = 0, toX = 0, toY = 0): Line => ({
  fromX,
  fromY,
  toX,
  toY,
})
export const createFromFromAndTo = (from: Vector2, to: Vector2): Line =>
  create(from.x, from.y, to.x, to.y)
export const createFromAngle = (from: Vector2, direction: Vector2, length: number): Line => {
  const to = vector2.toMutable(from)
  vector2.move(to, direction, length)
  return createFromFromAndTo(from, to)
}
export const createObserved = (fromX = 0, fromY = 0, toX = 0, toY = 0): ObservedLine =>
  new Proxy<ObservedLine>(
    { fromX, fromY, toX, toY, changedProperties: [] },
    {
      set: (target, propertyKey: keyof Line) => {
        target.changedProperties.push(propertyKey)
        return true
      },
    },
  )
export const createObservedFromFromAndTo = (from: Vector2, to: Vector2): ObservedLine =>
  createObserved(from.x, from.y, to.x, to.y)
export const createImmutable = (fromX = 0, fromY = 0, toX = 0, toY = 0): ReadonlyLine =>
  Object.freeze({ fromX, fromY, toX, toY })
export const createImmutableFromVectors = (from: Vector2, to: Vector2): ReadonlyLine =>
  createImmutable(from.x, from.y, to.x, to.y)
export const toMutable = (line: Line): Line => create(line.fromX, line.fromY, line.toX, line.toY)
export const toImmutable = (line: Line): ReadonlyLine =>
  createImmutable(line.fromX, line.fromY, line.toX, line.toY)

export const createTuple = (fromX = 0, fromY = 0, toX = 0, toY = 0): LineTuple =>
  Object.freeze([fromX, fromY, toX, toY] as LineTuple)
export const createTupleFromFromAndTo = (from: Vector2, to: Vector2): LineTuple =>
  Object.freeze([from.x, from.y, to.x, to.y] as LineTuple)
export const fromTuple = ([fromX, fromY, toX, toY]: LineTuple): Line =>
  create(fromX, fromY, toX, toY)
export const observedFromTuple = ([fromX, fromY, toX, toY]: LineTuple): ReadonlyLine =>
  createObserved(fromX, fromY, toX, toY)
export const immutableFromTuple = ([fromX, fromY, toX, toY]: LineTuple): ReadonlyLine =>
  createImmutable(fromX, fromY, toX, toY)
export const toTuple = (line: Line): LineTuple =>
  createTuple(line.fromX, line.fromY, line.toX, line.toY)
