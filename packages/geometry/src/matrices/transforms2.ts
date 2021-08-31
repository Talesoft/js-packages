/**
 * [ [ a, c, tx ],
 *   [ b, d, ty ],
 *   [ 0, 0, 1  ] ]
 *
 * a = X Scale
 * c = X Rotation throgh Y
 * tx = X Translation
 * b = Y Rotation through X
 * d = Y Scale
 * ty = Y Translation
 *
 * last row is constant (and will be ignored by the implementation, only tx/ty
 * will be used in the multiplication as it's tx * 1 anyways)
 *
 * Will be projected against 2d points (x, y)
 *
 * [ a, c, tx ]     [ x ]     [ a * x + c * y + tx * 1 ]       [ Transformed X ]
 * [ b, d, ty ]  *  [ y ]  =  [ b * x + d * y + ty * 1 ]   =   [ Transformed Y ]
 * [ 0, 0, 1  ]     [ 1 ]     [ 0 * x + 0 * y + 1  * 1 ]       [ 1 (Ignored Z) ]
 */
import { Vector2Literal } from '../vectors2'

export interface Transform2Literal {
    readonly a: number
    readonly c: number
    readonly tx: number
    readonly b: number
    readonly d: number
    readonly ty: number
}

export type Transform2Tuple = readonly [
    readonly [number, number, number],
    readonly [number, number, number],
]

export class Transform2 {
    public static readonly identity = Transform2.create()

    public static create(a = 1, c = 0, tx = 0, b = 0, d = 1, ty = 0) {
        return Object.freeze({ a, c, tx, b, d, ty }) as Transform2Literal
    }

    public static copy(mat: Transform2Literal) {
        return Transform2.create(mat.a, mat.c, mat.tx, mat.b, mat.d, mat.ty)
    }

    public static createTuple(a = 1, c = 0, tx = 0, b = 0, d = 1, ty = 0) {
        return Object.freeze([
            [a, c, tx],
            [b, d, ty],
        ] as const) as Transform2Tuple
    }

    public static fromTuple(tuple: Transform2Tuple) {
        return Transform2.create(
            tuple[0][0],
            tuple[0][1],
            tuple[0][2],
            tuple[1][0],
            tuple[1][1],
            tuple[1][2],
        )
    }

    public static toTuple(mat: Transform2Literal) {
        return Transform2.createTuple(mat.a, mat.c, mat.tx, mat.b, mat.d, mat.ty) as Transform2Tuple
    }

    public static getDeterminant(mat: Transform2Literal) {
        return mat.a * mat.d - mat.b * mat.c
    }

    public static set(parts: Partial<Transform2Literal>, mat: Transform2Literal) {
        return Object.freeze({
            ...mat,
            ...parts,
        }) as Transform2Literal
    }

    public static translate(vec2: Vector2Literal, mat: Transform2Literal) {
        return Transform2.set({ tx: mat.tx + vec2.x, ty: mat.ty + vec2.y }, mat)
    }

    public static scale(vec2: Vector2Literal, mat: Transform2Literal) {
        return Transform2.multiply(
            {
                a: vec2.x,
                c: 0,
                tx: 0,
                b: 0,
                d: vec2.y,
                ty: 0,
            },
            mat,
        )
    }

    public static rotate(radians: number, mat: Transform2Literal) {
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)
        return Transform2.multiply(
            {
                a: cos,
                c: -sin,
                tx: 0,
                b: sin,
                d: -cos,
                ty: 0,
            },
            mat,
        )
    }

    public static skew(vec2: Vector2Literal, mat: Transform2Literal) {
        return this.multiply(
            {
                a: 1,
                c: Math.tan(vec2.x),
                tx: 0,
                b: Math.tan(vec2.y),
                d: 1,
                ty: 0,
            },
            mat,
        )
    }

    public static invert(mat: Transform2Literal) {
        const det = Transform2.getDeterminant(mat)
        if (det === 0) {
            throw new Error(
                'The matrix is not inversible since it would require a division through zero',
            )
        }
        return Transform2.create(
            mat.d / det,
            -mat.c / det,
            (mat.c * mat.ty - mat.d * mat.tx) / det,
            -mat.b / det,
            mat.a / det,
            (-mat.a * mat.ty + mat.b * mat.tx) / det,
        )
    }

    public static multiply(other: Transform2Literal, mat: Transform2Literal) {
        const { a, c, tx, b, d, ty } = mat
        return Transform2.create(
            a * other.a + c * other.b,
            a * other.c + c * other.d,
            a * other.tx + c * other.ty + tx,
            b * other.a + d * other.b,
            b * other.c + d * other.d,
            b * other.tx + d * other.ty + ty,
        )
    }
}
