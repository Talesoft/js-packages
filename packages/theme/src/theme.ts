import type { ColorName, ColorPalette } from './colors'
import type { Size, SizeMap } from './common'
import type { FontName, TextFormatName, Typography, TextFormat } from './typography'
import { createColorShades } from './colors'

export interface Theme<
    ColorNames extends string = ColorName,
    FontNames extends string = FontName,
    TextFormatNames extends string = TextFormatName,
    Sizes extends string = Size
> {
    readonly colors: ColorPalette<ColorNames>
    readonly typography: Typography<FontNames, TextFormatNames, Sizes>
    readonly breakpoints: SizeMap<number, Sizes>
    readonly maxWidths: SizeMap<number, Sizes>
    readonly spacingFactors: SizeMap<number, Sizes>
    readonly spacing: number
    readonly borderWidths: SizeMap<number, Sizes>
    readonly borderRadius: number
}

export const defaultTextFormat: TextFormat = {
    font: 'text',
    lineHeight: 1.2,
    size: 1,
    style: 'normal',
    weight: 'normal',
    decoration: 'none',
}

export const defaultTheme: Theme = {
    colors: {
        primary: createColorShades('#E94F4F'),
        secondary: createColorShades('#E9954F'),
        tertiary: createColorShades('#2F8C8C'),
        quartenary: createColorShades('#3FBA3F'),
        success: createColorShades('#0f0'),
        info: createColorShades('#0ff'),
        warning: createColorShades('#ff0'),
        danger: createColorShades('#00f'),
    },
    typography: {
        size: 16,
        fonts: {
            text: {
                name: 'Open Sans',
                fallbacks: ['sans-serif'],
                url:
                    'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap',
            },
            design: {
                name: 'Open Sans',
                fallbacks: ['sans-serif'],
                url:
                    'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap',
            },
        },
        formats: {
            heading1: { ...defaultTextFormat, font: 'design', size: 2.5, weight: 'bold' },
            heading2: { ...defaultTextFormat, font: 'design', size: 2, weight: 'bold' },
            heading3: { ...defaultTextFormat, font: 'design', size: 1.6, weight: 'bold' },
            heading4: { ...defaultTextFormat, font: 'design', size: 1.3, weight: 'bold' },
            heading5: { ...defaultTextFormat, font: 'design', weight: 'bold' },
            heading6: { ...defaultTextFormat, font: 'design' },
            paragraph: defaultTextFormat,
            button: { ...defaultTextFormat, weight: 'bold' },
            input: defaultTextFormat,
            label: { ...defaultTextFormat, weight: 'bold' },
            link: defaultTextFormat,
        },
        sizeFactors: {
            xxs: 0.5,
            xs: 0.7,
            s: 0.9,
            m: 1,
            l: 1.1,
            xl: 1.4,
            xxl: 1.7,
        },
    },
    breakpoints: {
        xxs: 0,
        xs: 350,
        s: 576,
        m: 768,
        l: 1024,
        xl: 1200,
        xxl: 1600,
    },
    maxWidths: {
        xxs: 400,
        xs: 620,
        s: 740,
        m: 1000,
        l: 1256,
        xl: 1400,
        xxl: 1800,
    },
    spacing: 20,
    spacingFactors: {
        xxs: 1,
        xs: 2,
        s: 3,
        m: 4,
        l: 5,
        xl: 6,
        xxl: 7,
    },
    borderWidths: {
        xxs: 1,
        xs: 2,
        s: 3,
        m: 4,
        l: 5,
        xl: 6,
        xxl: 7,
    },
    borderRadius: 3,
}
