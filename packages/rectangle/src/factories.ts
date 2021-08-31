import type { Vector2 } from '@talesoft/vector2'
import type { Rectangle, RectangleTuple, ObservedRectangle, ReadonlyRectangle } from './rectangles'

export const create = (x = 0, y = 0, width = 0, height = 0): Rectangle => ({
  x,
  y,
  width,
  height,
})
export const createFromLeftTopAndRightBottom = (
  leftTop: Vector2,
  rightBottom: Vector2,
): Rectangle => create(leftTop.x, leftTop.y, rightBottom.x - leftTop.x, rightBottom.y - leftTop.y)
export const createObserved = (x = 0, y = 0, width = 0, height = 0): ObservedRectangle =>
  new Proxy<ObservedRectangle>(
    { x, y, width, height, changedProperties: [] },
    {
      set: (target, propertyKey: keyof Rectangle) => {
        target.changedProperties.push(propertyKey)
        return true
      },
    },
  )
export const createObservedFromLeftTopAndRightBottom = (
  leftTop: Vector2,
  rightBottom: Vector2,
): ObservedRectangle =>
  createObserved(leftTop.x, leftTop.y, rightBottom.x - leftTop.x, rightBottom.y - leftTop.y)
export const createImmutable = (x = 0, y = 0, width = 0, height = 0): ReadonlyRectangle =>
  Object.freeze({ x, y, width, height })
export const createImmutableFromLeftTopAndRightBottom = (
  leftTop: Vector2,
  rightBottom: Vector2,
): ReadonlyRectangle =>
  createImmutable(leftTop.x, leftTop.y, rightBottom.x - leftTop.x, rightBottom.y - leftTop.y)
export const toMutable = (rect: Rectangle): Rectangle =>
  create(rect.x, rect.y, rect.width, rect.height)
export const toImmutable = (rect: Rectangle): ReadonlyRectangle =>
  createImmutable(rect.x, rect.y, rect.width, rect.height)

export const createTuple = (x = 0, y = 0, width = 0, height = 0): RectangleTuple =>
  Object.freeze([x, y, width, height] as RectangleTuple)
export const createTupleFromLeftTopAndRightBottom = (
  leftTop: Vector2,
  rightBottom: Vector2,
): RectangleTuple =>
  Object.freeze([
    leftTop.x,
    leftTop.y,
    rightBottom.x - leftTop.x,
    rightBottom.y - leftTop.y,
  ] as RectangleTuple)
export const fromTuple = ([x, y, width, height]: RectangleTuple): Rectangle =>
  create(x, y, width, height)
export const observedFromTuple = ([x, y, width, height]: RectangleTuple): ReadonlyRectangle =>
  createObserved(x, y, width, height)
export const immutableFromTuple = ([x, y, width, height]: RectangleTuple): ReadonlyRectangle =>
  createImmutable(x, y, width, height)
export const toTuple = (rect: Rectangle): RectangleTuple =>
  createTuple(rect.x, rect.y, rect.width, rect.height)
