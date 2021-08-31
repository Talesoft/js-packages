import Color, { generateColors, lighten, darken } from '@talesoft/color'

export type ColorName =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quartenary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
export type ColorShades = Record<number, string>
export type ColorPalette<ColorNames extends string = ColorName> = Record<ColorNames, ColorShades>

function* generateColorShades(
  colorString: string,
  length = 10,
  spread = 0.1,
): Generator<string | Color, void, unknown> {
  const color = Color.parse(colorString)
  const half = Math.floor(length / 2)
  const lastHalf = half % 2 !== 0 ? half : half - 1
  yield* generateColors(color, lighten, {
    length: half,
    step: -spread,
  })
  yield colorString
  yield* generateColors(color, darken, {
    length: lastHalf,
    step: spread,
    start: spread,
  })
}

export const createColorShades = (color: string, length = 10, spread = 0.1) =>
  Object.fromEntries(
    Array.from(generateColorShades(color, length, spread), (color, index) => [
      Math.floor((index / length) * 100),
      color.toString(),
    ]),
  )
