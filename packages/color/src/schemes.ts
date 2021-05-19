import { Color, complement, darken, lighten } from './colors'

export interface SchemeOptions {
    start?: number
    step?: number
}

export interface SchemeGenerationOptions extends SchemeOptions {
    length?: number
}

export type SchemeGenerator = (color: Color, value: number) => Color
export type Scheme<Keys extends string> = Record<Keys, Color>
export type LightShadeScheme = Scheme<'normal' | 'light' | 'lighter' | 'lightest'>
export type DarkShadeScheme = Scheme<'normal' | 'dark' | 'darker' | 'darkest'>
export type ShadeScheme = LightShadeScheme | DarkShadeScheme

export function* generateColors(
    color: Color,
    generate: SchemeGenerator,
    options?: SchemeGenerationOptions,
) {
    const { start = 0, step = 0.1, length = 5 } = options ?? {}
    for (let index = 0; index < length; index += 1) {
        yield generate(color, start + index * step)
    }
}

export function createScheme<Keys extends string, SchemeType extends Scheme<Keys>>(
    color: Color,
    keys: readonly Keys[],
    generate: SchemeGenerator,
    options?: SchemeOptions,
): SchemeType {
    const genOptions = { ...options, length: keys.length }
    return Object.fromEntries(
        Array.from(generateColors(color, generate, genOptions), (color, index) => [
            keys[index],
            color,
        ]),
    ) as SchemeType
}

export function createLightShadeScheme(color: Color, options?: SchemeOptions) {
    return createScheme(
        color,
        ['normal', 'light', 'lighter', 'lightest'],
        lighten,
        options,
    ) as LightShadeScheme
}

export function createDarkShadeScheme(color: Color, options?: SchemeOptions) {
    return createScheme(
        color,
        ['normal', 'dark', 'darker', 'darkest'],
        darken,
        options,
    ) as DarkShadeScheme
}

export function createShadeScheme(color: Color, options?: SchemeOptions) {
    return {
        ...createLightShadeScheme(color, options),
        ...createDarkShadeScheme(color, options),
    } as ShadeScheme
}

export function createComplementaryScheme(color: Color) {
    // TODO: Use HSL scales for 180
    return createScheme(color, ['primary', 'secondary'], complement, { step: 180 })
}

export function createAnalogousComplementaryScheme(color: Color) {
    // TODO: Use HSL scales for -30 and 30
    return createScheme(color, ['tertiary', 'primary', 'secondary'], complement, {
        start: -30,
        step: 30,
    })
}

export function createSplitComplementaryScheme(color: Color) {
    // TODO: Use HSL scales for -150 and 150
    return createScheme(color, ['tertiary', 'primary', 'secondary'], complement, {
        start: -150,
        step: 150,
    })
}

export function createTriadicComplementaryScheme(color: Color) {
    // TODO: Use HSL scales for -120 and 120
    return createScheme(color, ['tertiary', 'primary', 'secondary'], complement, {
        start: -120,
        step: 120,
    })
}

export function createSquareComplementaryScheme(color: Color) {
    // TODO: Use HSL scales for 90
    return createScheme(color, ['primary', 'secondary', 'tertiary', 'quartenary'], complement, {
        step: 90,
    })
}

export function createTetradicComplementaryScheme(color: Color) {
    // TODO: Use HSL scales
    return {
        primary: color,
        secondary: complement(color, 120),
        tertiary: complement(color, 180),
        quartenary: complement(color, -60),
    } as Scheme<'primary' | 'secondary' | 'tertiary' | 'quartenary'>
}
