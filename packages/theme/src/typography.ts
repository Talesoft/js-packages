import type { Size, SizeMap } from './common'

export type FontName = 'text' | 'design'
export interface Font {
    readonly name: string
    readonly fallbacks?: string[]
    readonly url?: string
}
export type FontRecord<FontNames extends string = FontName> = Record<FontNames, Font>

export type TextFormatName =
    | 'paragraph'
    | `heading${1 | 2 | 3 | 4 | 5 | 6}`
    | 'link'
    | 'button'
    | 'label'
    | 'input'
export type TextWeight =
    | 'thin'
    | 'extraLight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | 'extraBold'
    | 'black'
export const textWeightMap = {
    thin: 100,
    extraLight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
} as Record<TextWeight, number>

export type TextStyle = 'normal' | 'italic'
export type TextDecoration = 'none' | 'underline' | 'strikeThrough'
export interface TextFormat<FontNames extends string = FontName> {
    readonly font: FontNames
    readonly size: number
    readonly lineHeight: number
    readonly weight: TextWeight
    readonly style: TextStyle
    readonly decoration: TextDecoration
}

export type TextFormatRecord<
    FontNames extends string = FontName,
    TextFormatNames extends string = TextFormatName
> = Record<TextFormatNames, TextFormat<FontNames>>

export interface Typography<
    FontNames extends string = FontName,
    TextFormatNames extends string = TextFormatName,
    Sizes extends string = Size
> {
    readonly size: number
    readonly fonts: FontRecord<FontNames>
    readonly formats: TextFormatRecord<FontNames, TextFormatNames>
    readonly sizeFactors: SizeMap<number, Sizes>
}

export function quoteFontName(name: string): string {
    return name.indexOf(' ') === -1 ? name : `"${name}"`
}
