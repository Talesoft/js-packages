import { Vector2, Vector2Literal, Vector2Tuple } from './vectors2'
import { Edge } from './edges'
import { Rectangle } from './rectangles'
import { Circle } from './circles'

const { min, max } = Math

export interface PolygonLiteral {
    readonly vertices: ReadonlyArray<Vector2Literal>
}

export type PolygonTuple = ReadonlyArray<Vector2Tuple>

export class Polygon {
    public static create(vertices: ReadonlyArray<Vector2Literal>) {
        return Object.freeze({ vertices }) as PolygonLiteral
    }

    public static clone(poly: PolygonLiteral) {
        return Polygon.create(poly.vertices.map(Vector2.clone))
    }

    public static isPolygon(value: any): value is PolygonLiteral {
        return typeof value === 'object' && 'vertices' in value
    }

    public static createTuple(vertices: ReadonlyArray<Vector2Literal>) {
        return Object.freeze(vertices.map(Vector2.toTuple)) as PolygonTuple
    }

    public static fromTuple(tuple: PolygonTuple) {
        return Polygon.create(tuple.map(Vector2.fromTuple))
    }

    public static toTuple(poly: PolygonLiteral) {
        return Polygon.createTuple(poly.vertices)
    }

    public static getCenter(poly: PolygonLiteral) {
        const len = poly.vertices.length
        return Vector2.scale(
            1 / len,
            poly.vertices.reduce((carry, vec2) => Vector2.add(carry, vec2), Vector2.create()),
        )
    }

    public static getBounds(poly: PolygonLiteral) {
        const [minX, minY, maxX, maxY] = poly.vertices.reduce(
            ([minX, minY, maxX, maxY], vec2) => [
                min(minX, vec2.x),
                min(minY, vec2.y),
                max(maxX, vec2.x),
                max(maxY, vec2.y),
            ],
            [Infinity, Infinity, -Infinity, -Infinity],
        )
        return Rectangle.create(minX, minY, maxX - minX, maxY - minY)
    }

    public static getEdges(poly: PolygonLiteral) {
        const len = poly.vertices.length
        if (len < 2) {
            return []
        }
        return poly.vertices.map((vec2, i) => Edge.create(vec2, poly.vertices[(i + 1) % len]))
    }

    public static getEdgeNormals(poly: PolygonLiteral) {
        return Polygon.getEdges(poly).map(Edge.getNormal)
    }

    public static getEdgeCenters(poly: PolygonLiteral) {
        return Polygon.getEdges(poly).map(Edge.getCenter)
    }

    public static getX(poly: PolygonLiteral) {
        return Polygon.getBounds(poly).x
    }

    public static withX(value: number, poly: PolygonLiteral) {
        const diff = value - Polygon.getX(poly)
        return Polygon.create(poly.vertices.map(vec2 => Vector2.create(vec2.x + diff, vec2.y)))
    }

    public static getY(poly: PolygonLiteral) {
        return Polygon.getBounds(poly).y
    }

    public static withY(value: number, poly: PolygonLiteral) {
        const diff = value - Polygon.getY(poly)
        return Polygon.create(poly.vertices.map(vec2 => Vector2.create(vec2.x, vec2.y + diff)))
    }

    public static getWidth(poly: PolygonLiteral) {
        return Polygon.getBounds(poly).width
    }

    public static withWidth(value: number, poly: PolygonLiteral) {
        const bounds = Polygon.getBounds(poly)
        const ratio = value / bounds.width
        const x = bounds.x
        return Polygon.create(
            poly.vertices.map(vec2 => Vector2.create(vec2.x + x + (vec2.x - x) * ratio, vec2.y)),
        )
    }

    public static getHeight(poly: PolygonLiteral) {
        return Polygon.getBounds(poly).height
    }

    public static withHeight(value: number, poly: PolygonLiteral) {
        const bounds = Polygon.getBounds(poly)
        const ratio = value / bounds.height
        const y = bounds.y
        return Polygon.create(
            poly.vertices.map(vec2 => Vector2.create(vec2.x, vec2.y + y + (vec2.x - y) * ratio)),
        )
    }

    public contains(vec2: Readonly<Vector2Literal>, poly: PolygonLiteral) {
        const bounds = Polygon.getBounds(poly)
        // Quick rectangle collision check to avoid more expensive
        if (!Rectangle.contains(vec2, bounds)) {
            return false
        }

        const leftTop = Vector2.subtract(Rectangle.getLeftTop(bounds), { x: 1, y: 1 })
        const ray = Edge.create(vec2, leftTop)
        const edges = Polygon.getEdges(poly)
        const intersections = edges.reduce(
            (acc, edge) => acc + (Edge.intersectEdge(edge, ray, true) !== null ? 1 : 0),
            0,
        )
        return intersections % 2 !== 0
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static overlapsEdge(_edge: Edge): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static intersectEdge(_edge: Edge): Vector2[] {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static overlapsRectangle(_rect: Rectangle): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static intersectRectangle(_rect: Rectangle): Vector2[] {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static overlapsCircle(_circle: Circle): boolean {
        throw new Error('Not implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static intersectCircle(_circle: Circle): Vector2[] {
        throw new Error('Not implemented')
    }

    public static overlapsPolygon(overlapPoly: PolygonLiteral, poly: PolygonLiteral) {
        const edges = Polygon.getEdges(poly)
        const overlapEdges = Polygon.getEdges(overlapPoly)
        return edges.some(edge => overlapEdges.some(polyEdge => Edge.intersectEdge(polyEdge, edge)))
    }

    public static intersectPolygon(intersectPoly: PolygonLiteral, poly: PolygonLiteral) {
        const intersections: Vector2[] = []
        const edges = Polygon.getEdges(poly)
        const intersectEdges = Polygon.getEdges(intersectPoly)
        for (let i = 0, len = edges.length; i < len; i += 1) {
            const edge = edges[i]
            for (let j = 0; j < intersectEdges.length; j += 1) {
                const intersection = Edge.intersectEdge(intersectEdges[j], edge)
                if (intersection !== null) {
                    intersections.push(intersection)
                }
            }
        }
        return intersections
    }
}
