import type { Vector2 } from '@talesoft/vector2'
import { toMutable } from '@talesoft/vector2'
import type { Line } from '@talesoft/line'
import type { Rectangle } from './rectangles'
import type { ObservedRectangle } from './rectangles'
import * as vector2 from '@talesoft/vector2'
import * as line from '@talesoft/line'

export const getArea = (rect: Rectangle): number => rect.width * rect.height

export const getPosition = (rect: Rectangle): Vector2 => ({ x: rect.x, y: rect.y })
export const getSize = (rect: Rectangle): Vector2 => ({ x: rect.width, y: rect.height })

export const getVertices = (rect: Rectangle): Vector2[] => [
  getLeftTop(rect),
  getRightTop(rect),
  getRightBottom(rect),
  getLeftBottom(rect),
]

export const getLines = (rect: Rectangle): Line[] => [
  getLeftLine(rect),
  getTopLine(rect),
  getRightLine(rect),
  getBottomLine(rect),
]

export const getCenter = (rect: Rectangle): Vector2 => {
  const position = getPosition(rect)
  const size = getSize(rect)
  vector2.half(size)
  vector2.add(position, size)
  return position
}

export const getLeft = (rect: Rectangle): number => rect.x
export const getTop = (rect: Rectangle): number => rect.y
export const getRight = (rect: Rectangle): number => rect.x + rect.width
export const getBottom = (rect: Rectangle): number => rect.y + rect.height

export const getLeftTop = (rect: Rectangle): Vector2 => ({ x: rect.x, y: rect.y })
export const getRightTop = (rect: Rectangle): Vector2 => ({ x: rect.x + rect.width, y: rect.y })
export const getRightBottom = (rect: Rectangle): Vector2 => ({
  x: rect.x + rect.width,
  y: rect.y + rect.height,
})
export const getLeftBottom = (rect: Rectangle): Vector2 => ({ x: rect.x, y: rect.y + rect.height })

export const getLeftLine = (rect: Rectangle): Line =>
  line.createFromFromAndTo(getLeftBottom(rect), getLeftTop(rect))
export const getTopLine = (rect: Rectangle): Line =>
  line.createFromFromAndTo(getLeftTop(rect), getRightTop(rect))
export const getRightLine = (rect: Rectangle): Line =>
  line.createFromFromAndTo(getRightTop(rect), getRightBottom(rect))
export const getBottomLine = (rect: Rectangle): Line =>
  line.createFromFromAndTo(getRightBottom(rect), getLeftBottom(rect))

export const set = (rect: Rectangle, x: number, y: number, width: number, height: number): void => {
  rect.x = x
  rect.y = y
  rect.width = width
  rect.height = height
}

export const setPosition = (
  rect: Rectangle,
  { x = rect.x, y = rect.y }: Partial<Vector2>,
): void => {
  rect.x = x
  rect.y = y
}

export const setSize = (rect: Rectangle, { x = rect.x, y = rect.y }: Partial<Vector2>): void => {
  rect.width = x
  rect.height = y
}

export const setPositionAndSize = (rect: Rectangle, position: Vector2, size: Vector2): void => {
  setPosition(rect, position)
  setSize(rect, size)
}

export const setCenter = (rect: Rectangle, center: Vector2): void => {
  const position = toMutable(center)
  const size = getSize(rect)
  vector2.half(size)
  vector2.subtract(position, size)
  setPosition(rect, position)
}

export const setLeft = (rect: Rectangle, value: number): void => {
  rect.width -= rect.x - value
  rect.x = value
}

export const setTop = (rect: Rectangle, value: number): void => {
  rect.height -= rect.y - value
  rect.y = value
}

export const setRight = (rect: Rectangle, value: number): void => {
  rect.width = rect.x - value
}

export const setBottom = (rect: Rectangle, value: number): void => {
  rect.height = rect.y - value
}

export const setLeftTop = (rect: Rectangle, value: Vector2): void => {
  setLeft(rect, value.x)
  setTop(rect, value.y)
}

export const setRightTop = (rect: Rectangle, value: Vector2): void => {
  setRight(rect, value.x)
  setTop(rect, value.y)
}

export const setRightBottom = (rect: Rectangle, value: Vector2): void => {
  setRight(rect, value.x)
  setBottom(rect, value.y)
}

export const setLeftBottom = (rect: Rectangle, value: Vector2): void => {
  setLeft(rect, value.x)
  setBottom(rect, value.y)
}

export const copy = (rect: Rectangle, source: Rectangle): void => {
  rect.x = source.x
  rect.y = source.y
  rect.width = source.width
  rect.height = source.height
}

export const mutatePosition = (rect: Rectangle, mutator: (position: Vector2) => void): void => {
  const position = getPosition(rect)
  mutator(position)
  setPosition(rect, position)
}

export const mutateSize = (rect: Rectangle, mutator: (size: Vector2) => void): void => {
  const size = getSize(rect)
  mutator(size)
  setSize(rect, size)
}

export const mutatePositionAndSize = (
  rect: Rectangle,
  mutator: (position: Vector2, size: Vector2) => void,
): void => {
  const position = getPosition(rect)
  const size = getSize(rect)
  mutator(position, size)
  setPositionAndSize(rect, position, size)
}

export const mutateLeftTop = (rect: Rectangle, mutator: (leftTop: Vector2) => void): void => {
  const leftTop = getLeftTop(rect)
  mutator(leftTop)
  setLeftTop(rect, leftTop)
}

export const mutateRightTop = (rect: Rectangle, mutator: (rightTop: Vector2) => void): void => {
  const rightTop = getRightTop(rect)
  mutator(rightTop)
  setRightTop(rect, rightTop)
}

export const mutateRightBottom = (
  rect: Rectangle,
  mutator: (rightBottom: Vector2) => void,
): void => {
  const rightBottom = getRightBottom(rect)
  mutator(rightBottom)
  setRightBottom(rect, rightBottom)
}

export const mutateLeftBottom = (rect: Rectangle, mutator: (leftBottom: Vector2) => void): void => {
  const leftBottom = getLeftBottom(rect)
  mutator(leftBottom)
  setLeftBottom(rect, leftBottom)
}

export const add = (
  rect: Rectangle,
  { x = 0, y = 0, width = 0, height = 0 }: Partial<Rectangle>,
): void => {
  rect.x += x
  rect.y += y
  rect.width += width
  rect.height += height
}

export const subtract = (
  rect: Rectangle,
  { x = 0, y = 0, width = 0, height = 0 }: Partial<Rectangle>,
): void => {
  rect.x -= x
  rect.y -= y
  rect.width -= width
  rect.height -= height
}

export const multiply = (
  rect: Rectangle,
  { x = 1, y = 1, width = 1, height = 1 }: Partial<Rectangle>,
): void => {
  rect.x *= x
  rect.y *= y
  rect.width *= width
  rect.height *= height
}

export const divide = (
  rect: Rectangle,
  { x = 1, y = 1, width = 1, height = 1 }: Partial<Rectangle>,
): void => {
  rect.x /= x
  rect.y /= y
  rect.width /= width
  rect.height /= height
}

export const scale = (rect: Rectangle, value: number): void => {
  rect.x *= value
  rect.y *= value
  rect.width *= value
  rect.height *= value
}

export const cover = (rect: Rectangle, value: Vector2): void => {
  if (value.x < getLeft(rect)) {
    setLeft(rect, value.x)
  }
  if (value.x > getRight(rect)) {
    setRight(rect, value.x)
  }
  if (value.y < getTop(rect)) {
    setTop(rect, value.y)
  }
  if (value.y > getBottom(rect)) {
    setBottom(rect, value.y)
  }
}

export const clearChanges = (rect: ObservedRectangle): void => {
  rect.changedProperties.splice(0, rect.changedProperties.length)
}
