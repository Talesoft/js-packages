import { Vector2, Vector2Literal, Vector2Tuple } from './vectors2'

export interface EdgeLiteral {
    readonly from: Vector2Literal
    readonly to: Vector2Literal
}

export type EdgeTuple = readonly [Vector2Tuple, Vector2Tuple]

export class Edge {
    public static create(from: Vector2Literal, to: Vector2Literal) {
        return Object.freeze({ from, to }) as EdgeLiteral
    }

    public static clone(edge: EdgeLiteral) {
        return Edge.create(edge.from, edge.to)
    }

    public static isEdge(value: any): value is EdgeLiteral {
        // TODO: Strengthen this check?
        return typeof value === 'object' && 'from' in value && 'to' in value
    }

    public static createTuple(from: Vector2Literal, to: Vector2Literal) {
        return Object.freeze([Vector2.toTuple(from), Vector2.toTuple(to)]) as EdgeTuple
    }

    public static fromTuple(tuple: EdgeTuple) {
        return Edge.create(
            Vector2.create(tuple[0][0], tuple[0][1]),
            Vector2.create(tuple[1][0], tuple[1][1]),
        )
    }

    public static toTuple(edge: EdgeLiteral) {
        return Edge.createTuple(edge.from, edge.to)
    }

    static getLength(edge: EdgeLiteral) {
        return Vector2.getDistanceTo(edge.to, edge.from)
    }

    static getCenter(edge: EdgeLiteral) {
        return Vector2.half(Vector2.add(edge.from, edge.to))
    }

    static getNormal(edge: EdgeLiteral) {
        return Vector2.normalize(Vector2.perpendicular(Vector2.subtract(edge.from, edge.to)))
    }

    public static intersectEdge(intersectEdge: EdgeLiteral, edge: EdgeLiteral, ray = false) {
        const dx1 = edge.to.x - edge.from.x
        const dy1 = edge.to.y - edge.from.y
        const dx2 = edge.from.x - intersectEdge.from.x
        const dy2 = edge.from.y - intersectEdge.from.y
        const dx3 = intersectEdge.to.x - intersectEdge.from.x
        const dy3 = intersectEdge.to.y - intersectEdge.from.y
        if (dy1 / dx1 === dy3 / dx3) {
            return null
        }
        const d = dx1 * dy3 - dy1 * dx3
        if (d === 0) {
            return null
        }
        const r = (dy2 * dx3 - dx2 * dy3) / d
        const s = (dy2 * dx1 - dx2 * dy1) / d
        if (r >= 0 && (ray || r <= 1) && s >= 0 && s <= 1) {
            return Vector2.create(edge.from.x + r * dx1, edge.from.y + r * dy1)
        }
        return null
    }
}
