import { Color, toAnyRgb } from './colors'
import { ColorSpace, getSpaceScales } from './spaces'

const { min } = Math

export enum MixMode {
  RGB_ADDITIVE = 'rgbAdditive',
  RGB_SUBTRACTIVE = 'rgbSubtractive',
  RGB_AVERAGE = 'rgbAverage',
}

export const mixRgbAdditive = (color: Color, mixColor: Color): Color => {
  const [r, g, b, a = 1] = toAnyRgb(color).data
  const [mixR, mixG, mixB, mixA = 1] = toAnyRgb(mixColor).data
  const [rScale, gScale, bScale, aScale] = getSpaceScales(ColorSpace.RGBA)
  const mixedR = min(rScale, r + mixR)
  const mixedG = min(gScale, g + mixG)
  const mixedB = min(bScale, b + mixB)
  const mixedA = min(aScale, (a + mixA) / 2)
  return mixedA < 1 ? Color.rgba(mixedR, mixedG, mixedB, mixedA) : Color.rgb(mixedR, mixedG, mixedB)
}

export const mixRgbSubtractive = (color: Color, mixColor: Color): Color => {
  const [r, g, b, a = 1] = toAnyRgb(color).data
  const [mixR, mixG, mixB, mixA = 1] = toAnyRgb(mixColor).data
  const [rScale, gScale, bScale, aScale] = getSpaceScales(ColorSpace.RGBA)
  const mixedR = min(rScale, (r * mixR) / rScale)
  const mixedG = min(gScale, (g * mixG) / gScale)
  const mixedB = min(bScale, (b * mixB) / bScale)
  const mixedA = min(aScale, (a + mixA) / 2)
  return mixedA < 1 ? Color.rgba(mixedR, mixedG, mixedB, mixedA) : Color.rgb(mixedR, mixedG, mixedB)
}

export const mixRgbAverage = (color: Color, mixColor: Color): Color => {
  const [r, g, b, a = 1] = toAnyRgb(color).data
  const [mixR, mixG, mixB, mixA = 1] = toAnyRgb(mixColor).data
  const [rScale, gScale, bScale, aScale] = getSpaceScales(ColorSpace.RGBA)
  const mixedR = min(rScale, (r + mixR) / 2)
  const mixedG = min(gScale, (g + mixG) / 2)
  const mixedB = min(bScale, (b + mixB) / 2)
  const mixedA = min(aScale, (a + mixA) / 2)
  return mixedA < 1 ? Color.rgba(mixedR, mixedG, mixedB, mixedA) : Color.rgb(mixedR, mixedG, mixedB)
}

export const mix = (
  color: Color,
  mixColor: Color,
  mode: MixMode = MixMode.RGB_SUBTRACTIVE,
): Color => {
  switch (mode) {
    case MixMode.RGB_ADDITIVE:
      return mixRgbAdditive(color, mixColor)
    case MixMode.RGB_SUBTRACTIVE:
      return mixRgbSubtractive(color, mixColor)
    case MixMode.RGB_AVERAGE:
      return mixRgbAverage(color, mixColor)
  }
}
