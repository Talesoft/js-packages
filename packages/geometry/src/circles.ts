import { Vector2, Vector2Literal } from './vectors2'
import { Edge } from './edges'
import { Rectangle, RectangleLiteral } from './rectangles'
import clamp from './clamp'
import { Polygon } from './polygons'

const { PI, sqrt } = Math

export interface CircleLiteral {
    readonly cx: number
    readonly cy: number
    readonly radius: number
}

export type CircleTuple = readonly [number, number, number]

export class Circle {
    public static create(cx = 0, cy = 0, radius = 0) {
        return Object.freeze({ cx, cy, radius }) as CircleLiteral
    }

    public static clone(circle: CircleLiteral) {
        return Circle.create(circle.cx, circle.cy, circle.radius)
    }

    public static isCircle(value: any): value is CircleLiteral {
        // TODO: Strengthen this check?
        return (
            typeof value === 'object' &&
            'x' in value &&
            'y' in value &&
            'width' in value &&
            'height' in value
        )
    }

    public static createTuple(cx = 0, cy = 0, radius = 0) {
        return Object.freeze([cx, cy, radius]) as CircleTuple
    }

    public static fromTuple(tuple: CircleTuple) {
        return Circle.create(tuple[0], tuple[1], tuple[2])
    }

    public static toTuple(circle: CircleLiteral) {
        return Circle.createTuple(circle.cx, circle.cy, circle.radius)
    }

    public static getArea(circle: CircleLiteral) {
        return circle.radius * circle.radius * PI
    }

    public static getCenter(circle: CircleLiteral) {
        return Vector2.create(circle.cx, circle.cy)
    }

    public static withCenter(vec2: Vector2Literal, circle: CircleLiteral) {
        return Circle.create(vec2.x, vec2.y, circle.radius)
    }

    public static add(operand: CircleLiteral, rect: CircleLiteral) {
        return Circle.create(
            rect.cx + operand.cx,
            rect.cy + operand.cy,
            rect.radius + operand.radius,
        )
    }

    public static subtract(operand: CircleLiteral, rect: CircleLiteral) {
        return Circle.create(
            rect.cx - operand.cx,
            rect.cy - operand.cy,
            rect.radius - operand.radius,
        )
    }

    public static multiply(operand: CircleLiteral, rect: CircleLiteral) {
        return Circle.create(
            rect.cx * operand.cx,
            rect.cy * operand.cy,
            rect.radius * operand.radius,
        )
    }

    public static divide(operand: CircleLiteral, rect: CircleLiteral) {
        return Circle.create(
            rect.cx / operand.cx,
            rect.cy / operand.cy,
            rect.radius / operand.radius,
        )
    }

    public static scale(value: number, rect: CircleLiteral) {
        return Circle.create(rect.cx * value, rect.cy * value, rect.radius * value)
    }

    public static contains(vec2: Vector2Literal, circle: CircleLiteral) {
        return (
            sqrt(
                (vec2.x - circle.cx) * (vec2.x - circle.cx) +
                    (vec2.y - circle.cy) * (vec2.y - circle.cy),
            ) < circle.radius
        )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static overlapsEdge(_edge: Edge): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static intersectEdge(_edge: Edge): Vector2[] {
        throw new Error('Not implemented')
    }

    public static overlapsRectangle(rect: RectangleLiteral, circle: CircleLiteral) {
        const v = Vector2.create(
            clamp(Rectangle.getLeft(rect), Rectangle.getRight(rect), circle.cx),
            clamp(Rectangle.getTop(rect), Rectangle.getBottom(rect), circle.cy),
        )
        const direction = Vector2.subtract(v, Circle.getCenter(circle))
        const mag = Vector2.getSquaredLength(direction)
        return mag > 0 && mag < circle.radius * circle.radius
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public intersectRectangle(_rect: RectangleLiteral): Vector2[] {
        throw new Error('Not implemented')
    }

    public overlapsCircle(overlapCircle: CircleLiteral, circle: CircleLiteral) {
        const distanceX = circle.cx - overlapCircle.cx
        const distanceY = circle.cy - overlapCircle.cy
        const radiusSum = circle.radius + overlapCircle.radius
        return distanceX * distanceX + distanceY * distanceY <= radiusSum * radiusSum
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public intersectCircle(_circle: CircleLiteral): Vector2[] {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public overlapsPolygon(_poly: Polygon): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public intersectPolygon(_poly: Polygon): Vector2[] {
        throw new Error('Not implemented')
    }
}
