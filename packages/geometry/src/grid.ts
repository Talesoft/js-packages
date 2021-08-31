import { Rectangle } from './rectangles'
import { Vector2, Vector2Literal } from './vectors2'

export interface GridLiteral {
    readonly rows: number
    readonly columns: number
    readonly itemWidth: number
    readonly itemHeight: number
    readonly gap: number
}

export function getGridLocation(index: number, grid: GridLiteral) {
    return Vector2.create(Math.floor(index / grid.columns), index % grid.columns)
}

export function getGridIndex(vec2: Vector2Literal, grid: GridLiteral) {
    return vec2.y * grid.columns + vec2.x
}

export function getGridRectangle(vec2: Vector2Literal, grid: GridLiteral) {
    return Rectangle.create(
        vec2.x * (grid.itemWidth + grid.gap),
        vec2.y * (grid.itemHeight + grid.gap),
        grid.itemWidth,
        grid.itemHeight,
    )
}

export class Grid {
    public static create(rows = 0, columns = 0, itemWidth = 0, itemHeight = 0, gap = 0) {
        return Object.freeze({ rows, columns, itemWidth, itemHeight, gap }) as GridLiteral
    }
}
