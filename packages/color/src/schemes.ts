import type { Color } from './colors'
import { complement, darken, lighten } from './colors'

export type SchemeOptions = {
  start?: number
  step?: number
}

export type SchemeGenerationOptions = {
  length?: number
} & SchemeOptions

export type SchemeGenerator = (color: Color, value: number) => Color
export type Scheme<Keys extends string> = Record<Keys, Color>
export type LightShadeScheme = Scheme<'normal' | 'light' | 'lighter' | 'lightest'>
export type DarkShadeScheme = Scheme<'normal' | 'dark' | 'darker' | 'darkest'>
export type ShadeScheme = LightShadeScheme | DarkShadeScheme

// eslint-disable-next-line func-style
export function* generateColors(
  color: Color,
  generate: SchemeGenerator,
  options?: SchemeGenerationOptions,
): Generator<Color, void, undefined> {
  const { start = 0, step = 0.1, length = 5 } = options ?? {}
  for (let index = 0; index < length; index += 1) {
    yield generate(color, start + index * step)
  }
}

export const createScheme = <Keys extends string, SchemeType extends Scheme<Keys>>(
  color: Color,
  keys: readonly Keys[],
  generate: SchemeGenerator,
  options?: SchemeOptions,
): SchemeType => {
  const genOptions = { ...options, length: keys.length }
  return Object.fromEntries(
    Array.from(generateColors(color, generate, genOptions), (color, index) => [keys[index], color]),
  ) as SchemeType
}

export const createLightShadeScheme = (color: Color, options?: SchemeOptions): LightShadeScheme =>
  createScheme(color, ['normal', 'light', 'lighter', 'lightest'], lighten, options)

export const createDarkShadeScheme = (color: Color, options?: SchemeOptions): DarkShadeScheme =>
  createScheme(color, ['normal', 'dark', 'darker', 'darkest'], darken, options)

export const createShadeScheme = (color: Color, options?: SchemeOptions): ShadeScheme => ({
  ...createLightShadeScheme(color, options),
  ...createDarkShadeScheme(color, options),
})

export const createComplementaryScheme = (color: Color): Scheme<'primary' | 'secondary'> =>
  createScheme(color, ['primary', 'secondary'], complement, { step: 180 })

export const createAnalogousComplementaryScheme = (
  color: Color,
): Scheme<'tertiary' | 'primary' | 'secondary'> =>
  createScheme(color, ['tertiary', 'primary', 'secondary'], complement, {
    start: -30,
    step: 30,
  })

export const createSplitComplementaryScheme = (
  color: Color,
): Scheme<'tertiary' | 'primary' | 'secondary'> =>
  createScheme(color, ['tertiary', 'primary', 'secondary'], complement, {
    start: -150,
    step: 150,
  })

export const createTriadicComplementaryScheme = (
  color: Color,
): Scheme<'tertiary' | 'primary' | 'secondary'> =>
  createScheme(color, ['tertiary', 'primary', 'secondary'], complement, {
    start: -120,
    step: 120,
  })

export const createSquareComplementaryScheme = (
  color: Color,
): Scheme<'tertiary' | 'primary' | 'secondary' | 'quartenary'> =>
  createScheme(color, ['primary', 'secondary', 'tertiary', 'quartenary'], complement, {
    step: 90,
  })

export const createTetradicComplementaryScheme = (
  color: Color,
): Scheme<'tertiary' | 'primary' | 'secondary' | 'quartenary'> =>
  ({
    primary: color,
    secondary: complement(color, 120),
    tertiary: complement(color, 180),
    quartenary: complement(color, -60),
  } as Scheme<'primary' | 'secondary' | 'tertiary' | 'quartenary'>)
