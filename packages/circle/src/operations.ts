import type { Vector2 } from '@talesoft/vector2'
import type { Circle } from './circles'
import type { ObservedCircle } from './circles'
import * as vector2 from '@talesoft/vector2'

export const getArea = (circle: Circle): number => circle.radius * circle.radius * Math.PI

export const getPosition = (circle: Circle): Vector2 => ({
  x: circle.cx - circle.radius,
  y: circle.cy - circle.radius,
})
export const getDiameter = (circle: Circle): number => circle.radius * 2

export const getCenter = (circle: Circle): Vector2 => ({ x: circle.cx, y: circle.cy })

export const set = (rect: Circle, cx: number, cy: number, radius: number): void => {
  rect.cx = cx
  rect.cy = cy
  rect.radius = radius
}

export const setPosition = (circle: Circle, position: Vector2): void => {
  circle.cx = position.x + circle.radius
  circle.cy = position.y + circle.radius
}

export const setDiameter = (circle: Circle, diameter: number): void => {
  const diff = circle.radius * 2 - diameter
  circle.cx -= diff
  circle.cy -= diff
  circle.radius = diameter / 2
}

export const setPositionAndDiameter = (
  circle: Circle,
  position: Vector2,
  diameter: number,
): void => {
  setPosition(circle, position)
  setDiameter(circle, diameter)
}

export const setCenter = (
  circle: Circle,
  { x = circle.cx, y = circle.cy }: Partial<Vector2>,
): void => {
  circle.cx = x
  circle.cy = y
}

export const copy = (circle: Circle, source: Circle): void => {
  circle.cx = source.cx
  circle.cy = source.cy
  circle.radius = source.radius
}

export const mutatePosition = (circle: Circle, mutator: (position: Vector2) => void): void => {
  const position = getPosition(circle)
  mutator(position)
  setPosition(circle, position)
}

export const add = (circle: Circle, { cx = 0, cy = 0, radius = 0 }: Partial<Circle>): void => {
  circle.cx += cx
  circle.cy += cy
  circle.radius += radius
}

export const subtract = (circle: Circle, { cx = 0, cy = 0, radius = 0 }: Partial<Circle>): void => {
  circle.cx -= cx
  circle.cy -= cy
  circle.radius -= radius
}

export const multiply = (circle: Circle, { cx = 1, cy = 1, radius = 1 }: Partial<Circle>): void => {
  circle.cx *= cx
  circle.cy *= cy
  circle.radius *= radius
}

export const divide = (circle: Circle, { cx = 1, cy = 1, radius = 1 }: Partial<Circle>): void => {
  circle.cx /= cx
  circle.cy /= cy
  circle.radius /= radius
}

export const scale = (circle: Circle, value: number): void => {
  circle.cx *= value
  circle.cy *= value
  circle.radius *= value
}

export const cover = (circle: Circle, value: Vector2): void => {
  const distance = vector2.getDistanceTo(getCenter(circle), value)
  if (circle.radius < distance) {
    circle.radius = distance
  }
}

export const clearChanges = (rect: ObservedCircle): void => {
  rect.changedProperties.splice(0, rect.changedProperties.length)
}
