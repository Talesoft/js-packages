import clamp01 from './clamp01'
import clamp from './clamp'
import { epsilon } from './constants'
import type { Transform2Literal } from './matrices/transforms2'

const { sqrt, acos, min, max } = Math

export type Vector2Literal = {
  x: number
  y: number
}

export type ReadonlyVector2Literal = Readonly<Vector2Literal>

export type Vector2Tuple = readonly [number, number]

export class Vector2 {
  public static readonly zero = Vector2.createImmutable(0, 0)
  public static readonly one = Vector2.createImmutable(1, 1)
  public static readonly up = Vector2.createImmutable(0, 1)
  public static readonly down = Vector2.createImmutable(0, -1)
  public static readonly left = Vector2.createImmutable(-1, 0)
  public static readonly right = Vector2.createImmutable(1, 0)
  public static readonly infinity = Vector2.createImmutable(Infinity, Infinity)
  public static readonly negativeInfinity = Vector2.createImmutable(-Infinity, -Infinity)

  public static create(x = 0, y = 0): Vector2Literal {
    return { x, y }
  }

  public static createImmutable(x = 0, y = 0): Vector2Literal {
    return Object.freeze({ x, y })
  }

  public static clone(vec2: Readonly<Vector2Literal>) {
    return Vector2.create(vec2.x, vec2.y)
  }

  public static isVector2(value: any): value is Vector2Literal {
    // TODO: Strengthen this check?
    return typeof value === 'object' && 'x' in value && 'y' in value
  }

  public static createTuple(x = 0, y = 0) {
    return Object.freeze([x, y]) as Vector2Tuple
  }

  public static fromTuple(tuple: Vector2Tuple) {
    return Vector2.create(tuple[0], tuple[1])
  }

  public static toTuple(vec2: Vector2Literal) {
    return Vector2.createTuple(vec2.x, vec2.y)
  }

  public static getSquaredLength(vec2: Readonly<Vector2Literal>) {
    return vec2.x * vec2.x + vec2.y * vec2.y
  }

  public static getLength(vec2: Readonly<Vector2Literal>) {
    return sqrt(Vector2.getSquaredLength(vec2))
  }

  public static add(operand: Readonly<Vector2Literal>, vec2: Readonly<Vector2Literal>) {
    return Vector2.create(vec2.x + operand.x, vec2.y + operand.y)
  }

  public static subtract(operand: Readonly<Vector2Literal>, vec2: Readonly<Vector2Literal>) {
    return Vector2.create(vec2.x - operand.x, vec2.y - operand.y)
  }

  public static multiply(operand: Readonly<Vector2Literal>, vec2: Readonly<Vector2Literal>) {
    return Vector2.create(vec2.x * operand.x, vec2.y * operand.y)
  }

  public static divide(operand: Readonly<Vector2Literal>, vec2: Readonly<Vector2Literal>) {
    return Vector2.create(vec2.x / operand.x, vec2.y / operand.y)
  }

  public static scale(value: number, vec2: Readonly<Vector2Literal>) {
    return Vector2.create(vec2.x * value, vec2.y * value)
  }

  public static half(vec2: Readonly<Vector2Literal>) {
    return Vector2.scale(0.5, vec2)
  }

  public static double(vec2: Readonly<Vector2Literal>) {
    return Vector2.scale(2, vec2)
  }

  public static triple(vec2: Readonly<Vector2Literal>) {
    return Vector2.scale(3, vec2)
  }

  public static negate(vec2: Readonly<Vector2Literal>) {
    return Vector2.create(-vec2.x, -vec2.y)
  }

  public static min(lhs: Readonly<Vector2Literal>, rhs: Readonly<Vector2Literal>) {
    return Vector2.create(min(lhs.x, rhs.x), min(lhs.y, rhs.y))
  }

  public static max(lhs: Readonly<Vector2Literal>, rhs: Readonly<Vector2Literal>) {
    return Vector2.create(max(lhs.x, rhs.x), max(lhs.y, rhs.y))
  }

  public static clamp(minValue: number, maxValue: number, vec2: Readonly<Vector2Literal>) {
    return Vector2.create(clamp(minValue, maxValue, vec2.x), clamp(minValue, maxValue, vec2.y))
  }

  public static clamp01(vec2: Readonly<Vector2Literal>) {
    return Vector2.create(clamp01(vec2.x), clamp01(vec2.y))
  }

  public static normalize(vec2: Readonly<Vector2Literal>) {
    const mag = Vector2.getLength(vec2)
    return mag !== 0 ? Vector2.create(vec2.x / mag, vec2.y / mag) : Vector2.zero
  }

  public static interpolate(
    t: number,
    target: Readonly<Vector2Literal>,
    vec2: Readonly<Vector2Literal>,
  ) {
    this.interpolateUnclamped(clamp01(t), vec2, target)
  }

  public static interpolateUnclamped(
    t: number,
    target: Readonly<Vector2Literal>,
    vec2: Readonly<Vector2Literal>,
  ) {
    return Vector2.create(vec2.x + (target.x - vec2.x) * t, vec2.y + (target.y - vec2.y) * t)
  }

  public static perpendicular(vec2: Readonly<Vector2Literal>) {
    return Vector2.create(vec2.y, -vec2.x)
  }

  public static moveTowardsWithDelta(
    maxDistanceDelta: number,
    target: Readonly<Vector2Literal>,
    vec2: Readonly<Vector2Literal>,
  ) {
    const toVec2 = Vector2.subtract(target, vec2)
    const dist = Vector2.getLength(toVec2)
    if (dist <= maxDistanceDelta || dist === 0) {
      return target
    }
    const divisor = dist * maxDistanceDelta
    return Vector2.create((vec2.x + toVec2.x) / divisor, (vec2.y + toVec2.y) / divisor)
  }

  public static moveTowards(target: Readonly<Vector2Literal>, vec2: Readonly<Vector2Literal>) {
    return Vector2.moveTowardsWithDelta(epsilon, target, vec2)
  }

  public static move(
    direction: Readonly<Vector2Literal>,
    amount: number,
    vec2: Readonly<Vector2Literal>,
  ) {
    return Vector2.add(Vector2.scale(amount, direction), vec2)
  }

  public static moveLeft(amount: number, vec2: Readonly<Vector2Literal>) {
    return Vector2.move(Vector2.left, amount, vec2)
  }

  public static moveUp(amount: number, vec2: Readonly<Vector2Literal>) {
    return Vector2.move(Vector2.up, amount, vec2)
  }

  public static moveRight(amount: number, vec2: Readonly<Vector2Literal>) {
    return Vector2.move(Vector2.right, amount, vec2)
  }

  public static moveDown(amount: number, vec2: Readonly<Vector2Literal>) {
    return Vector2.move(Vector2.down, amount, vec2)
  }

  public static getDotProduct(target: Readonly<Vector2Literal>, vec2: Readonly<Vector2Literal>) {
    return vec2.x * target.x + vec2.y * target.y
  }

  public static getAngleTo(
    target: Readonly<Vector2Literal>,
    vec2: Readonly<Vector2Literal>,
  ): number {
    const denominator = sqrt(Vector2.getSquaredLength(vec2) * Vector2.getSquaredLength(target))
    if (denominator < epsilon) {
      return 0
    }
    const dot = clamp(-1, 1, Vector2.getDotProduct(target, vec2) / denominator)
    return acos(dot)
  }

  public static getDistanceTo(target: Readonly<Vector2Literal>, vec2: Readonly<Vector2Literal>) {
    return Vector2.getLength(Vector2.subtract(target, vec2))
  }

  public static equals(compareVec2: Readonly<Vector2Literal>, vec2: Readonly<Vector2Literal>) {
    return compareVec2.x === vec2.x && compareVec2.y === vec2.y
  }

  public static isZero(vec2: Readonly<Vector2Literal>) {
    return vec2.x === 0 && vec2.y === 0
  }

  public static isOne(vec2: Readonly<Vector2Literal>) {
    return vec2.x === 1 && vec2.y === 1
  }

  public static project(vec2: Vector2Literal, mat: Transform2Literal) {
    return Vector2.create(
      mat.a * vec2.x + mat.c * vec2.y + mat.tx,
      mat.b * vec2.x + mat.d * vec2.y + mat.ty,
    )
  }
}
