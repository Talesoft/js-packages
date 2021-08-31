import { Vector2, Vector2Literal } from './vectors2'
import { Edge, EdgeLiteral } from './edges'
import { CircleLiteral } from './circles'
import { Polygon, PolygonLiteral } from './polygons'

export interface RectangleLiteral {
    readonly x: number
    readonly y: number
    readonly width: number
    readonly height: number
}

export type RectangleTuple = readonly [number, number, number, number]
export type RectangleVertexTuple = readonly [Vector2, Vector2, Vector2, Vector2]
export type RectangleEdgeTuple = readonly [Edge, Edge, Edge, Edge]

export class Rectangle {
    public static create(x = 0, y = 0, width = 0, height = 0) {
        return Object.freeze({ x, y, width, height }) as RectangleLiteral
    }

    public static clone(rect: RectangleLiteral) {
        return Rectangle.create(rect.x, rect.y, rect.width, rect.height)
    }

    public static isRectangle(value: any): value is RectangleLiteral {
        // TODO: Strengthen this check?
        return (
            typeof value === 'object' &&
            'x' in value &&
            'y' in value &&
            'width' in value &&
            'height' in value
        )
    }

    public static createTuple(x = 0, y = 0, width = 0, height = 0) {
        return Object.freeze([x, y, width, height]) as RectangleTuple
    }

    public static fromTuple(tuple: RectangleTuple) {
        return Rectangle.create(tuple[0], tuple[1], tuple[2], tuple[3])
    }

    public static toTuple(rect: RectangleLiteral) {
        return Rectangle.createTuple(rect.x, rect.y, rect.width, rect.height)
    }

    public toPolygon(rect: RectangleLiteral) {
        return Polygon.create(Array.from(Rectangle.getVertices(rect)))
    }

    public static getArea(rect: Readonly<RectangleLiteral>) {
        return rect.width * rect.height
    }

    public static getPosition(rect: RectangleLiteral) {
        return Vector2.create(rect.x, rect.y)
    }

    public static withPosition(vec2: Vector2Literal, rect: RectangleLiteral) {
        return Rectangle.create(vec2.x, vec2.y, rect.width, rect.height)
    }

    public static getSize(rect: RectangleLiteral) {
        return Vector2.create(rect.width, rect.height)
    }

    public static withSize(vec2: Vector2Literal, rect: RectangleLiteral) {
        return Rectangle.create(rect.x, rect.y, vec2.x, vec2.y)
    }

    public static getCenter(rect: RectangleLiteral) {
        return Vector2.create(rect.x + rect.width / 2, rect.y + rect.height / 2)
    }

    public static withCenter(vec2: RectangleLiteral, rect: RectangleLiteral) {
        return Rectangle.create(
            vec2.x - rect.width / 2,
            vec2.y - rect.height / 2,
            rect.width,
            rect.height,
        )
    }

    public static getLeft(rect: RectangleLiteral) {
        return rect.x
    }

    public static withLeft(value: number, rect: RectangleLiteral) {
        return Rectangle.create(
            value,
            rect.y,
            rect.width + (Rectangle.getLeft(rect) - value),
            rect.height,
        )
    }

    public static getRight(rect: RectangleLiteral) {
        return rect.x + rect.width
    }

    public static withRight(value: number, rect: RectangleLiteral) {
        return Rectangle.create(
            rect.x,
            rect.y,
            rect.width - (Rectangle.getRight(rect) - value),
            rect.height,
        )
    }

    public static getTop(rect: RectangleLiteral) {
        return rect.y
    }

    public static withTop(value: number, rect: RectangleLiteral) {
        return Rectangle.create(
            rect.x,
            value,
            rect.width,
            rect.height + (Rectangle.getTop(rect) - value),
        )
    }

    public static getBottom(rect: RectangleLiteral) {
        return rect.y + rect.height
    }

    public static withBottom(value: number, rect: RectangleLiteral) {
        return Rectangle.create(
            rect.x,
            rect.y,
            rect.width,
            rect.height - (Rectangle.getBottom(rect) - value),
        )
    }

    public static getLeftTop(rect: RectangleLiteral) {
        return Vector2.create(Rectangle.getLeft(rect), Rectangle.getTop(rect))
    }

    public static withLeftTop(vec2: Vector2Literal, rect: RectangleLiteral) {
        return Rectangle.withLeft(vec2.x, Rectangle.withTop(vec2.y, rect))
    }

    public static getRightTop(rect: RectangleLiteral) {
        return Vector2.create(Rectangle.getRight(rect), Rectangle.getTop(rect))
    }

    public static withRightTop(vec2: Vector2Literal, rect: RectangleLiteral) {
        return Rectangle.withRight(vec2.x, Rectangle.withTop(vec2.y, rect))
    }

    public static getLeftBottom(rect: RectangleLiteral) {
        return Vector2.create(Rectangle.getLeft(rect), Rectangle.getBottom(rect))
    }

    public static withLeftBottom(vec2: Vector2Literal, rect: RectangleLiteral) {
        return Rectangle.withLeft(vec2.x, Rectangle.withBottom(vec2.y, rect))
    }

    public static getRightBottom(rect: RectangleLiteral) {
        return Vector2.create(Rectangle.getRight(rect), Rectangle.getBottom(rect))
    }

    public static withRightBottom(vec2: Vector2Literal, rect: RectangleLiteral) {
        return Rectangle.withRight(vec2.x, Rectangle.withBottom(vec2.y, rect))
    }

    public static getLeftEdge(rect: RectangleLiteral) {
        return Edge.create(Rectangle.getLeftBottom(rect), Rectangle.getLeftTop(rect))
    }

    public static getRightEdge(rect: RectangleLiteral) {
        return Edge.create(Rectangle.getRightTop(rect), Rectangle.getRightBottom(rect))
    }

    public static getTopEdge(rect: RectangleLiteral) {
        return Edge.create(Rectangle.getLeftTop(rect), Rectangle.getRightTop(rect))
    }

    public static getBottomEdge(rect: RectangleLiteral) {
        return Edge.create(Rectangle.getRightBottom(rect), Rectangle.getLeftBottom(rect))
    }

    public static getVertices(rect: RectangleLiteral) {
        return [
            Rectangle.getLeftTop(rect),
            Rectangle.getRightTop(rect),
            Rectangle.getRightBottom(rect),
            Rectangle.getLeftBottom(rect),
        ] as const
    }

    public static getEdges(rect: RectangleLiteral) {
        return [
            Rectangle.getLeftEdge(rect),
            Rectangle.getTopEdge(rect),
            Rectangle.getRightEdge(rect),
            Rectangle.getBottomEdge(rect),
        ] as const
    }

    public static add(operand: RectangleLiteral, rect: RectangleLiteral) {
        return Rectangle.create(
            rect.x + operand.x,
            rect.y + operand.y,
            rect.width + operand.width,
            rect.height + operand.height,
        )
    }

    public static subtract(operand: RectangleLiteral, rect: RectangleLiteral) {
        return Rectangle.create(
            rect.x - operand.x,
            rect.y - operand.y,
            rect.width - operand.width,
            rect.height - operand.height,
        )
    }

    public static multiply(operand: RectangleLiteral, rect: RectangleLiteral) {
        return Rectangle.create(
            rect.x * operand.x,
            rect.y * operand.y,
            rect.width * operand.width,
            rect.height * operand.height,
        )
    }

    public static divide(operand: RectangleLiteral, rect: RectangleLiteral) {
        return Rectangle.create(
            rect.x / operand.x,
            rect.y / operand.y,
            rect.width / operand.width,
            rect.height / operand.height,
        )
    }

    public static scale(value: number, rect: RectangleLiteral) {
        return Rectangle.create(
            rect.x * value,
            rect.y * value,
            rect.width * value,
            rect.height * value,
        )
    }

    public static expandTo(vec2: Vector2Literal, rect: RectangleLiteral) {
        let newRect = rect
        if (vec2.x < Rectangle.getLeft(newRect)) {
            newRect = Rectangle.withLeft(vec2.x, newRect)
        }
        if (vec2.x > Rectangle.getRight(newRect)) {
            newRect = Rectangle.withRight(vec2.x, newRect)
        }
        if (vec2.y < Rectangle.getTop(newRect)) {
            newRect = Rectangle.withTop(vec2.y, newRect)
        }
        if (vec2.y > Rectangle.getBottom(newRect)) {
            newRect = Rectangle.withBottom(vec2.y, newRect)
        }
        return newRect
    }

    public static contains(vec2: Vector2Literal, rect: RectangleLiteral) {
        return (
            vec2.x >= rect.x &&
            vec2.x < rect.x + rect.width &&
            vec2.y >= rect.y &&
            vec2.y < rect.y + rect.height
        )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static overlapsEdge(_edge: EdgeLiteral, _rect: RectangleLiteral): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static intersectEdge(_edge: EdgeLiteral, _rect: RectangleLiteral): Vector2[] {
        throw new Error('Not implemented')
    }

    public static overlapsRectangle(
        _checkRect: RectangleLiteral,
        _rect: RectangleLiteral,
    ): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static intersectRectangle(
        _checkRect: RectangleLiteral,
        _rect: RectangleLiteral,
    ): Vector2[] {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static overlapsCircle(_circle: CircleLiteral, _rect: RectangleLiteral): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static intersectCircle(_circle: CircleLiteral, _rect: RectangleLiteral): Vector2[] {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static overlapsPolygon(_poly: PolygonLiteral, _rect: RectangleLiteral): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static intersectPolygon(_poly: PolygonLiteral, _rect: RectangleLiteral): Vector2[] {
        throw new Error('Not implemented')
    }
}
