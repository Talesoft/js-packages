import type { ColorName, ColorShades } from './colors'
import type { Size } from './common'
import type { Theme } from './theme'
import type {
    Font,
    TextWeight,
    TextStyle,
    FontName,
    TextFormat,
    TextFormatName,
} from './typography'
import { createColorShades } from './colors'
import { textWeightMap } from './typography'
import { defaultTheme } from './theme'

export class ColorShadeListBuilder {
    constructor(readonly shadeList: ColorShades) {}

    shadesOf(colorString: string, length = 10, spread = 0.1) {
        return new ColorShadeListBuilder(createColorShades(colorString, length, spread))
    }
}

export class FontBuilder {
    constructor(readonly font: Font) {}

    googleOpenFont(name: string, weights: Partial<Record<TextWeight, TextStyle[]>>) {
        const styleIndexes = {
            normal: 0,
            italic: 1,
        } as Record<TextStyle, number>
        const imports = Object.entries(weights)
            .flatMap(([weight, styles]) =>
                (styles as TextStyle[]).map(
                    style => `${styleIndexes[style]},${textWeightMap[weight as TextWeight]}`,
                ),
            )
            .join(';')
        return new FontBuilder({
            name: name,
            url: `https://fonts.googleapis.com/css2?family=${name.replace(
                ' ',
                '+',
            )}:ital,wght@${imports}&display=swap`,
        })
    }
}

export class TextFormatBuilder<FontNames extends string = FontName> {
    constructor(readonly format: TextFormat<FontNames>) {}

    font(name: FontNames) {
        return new TextFormatBuilder({
            ...this.format,
            font: name,
        })
    }
}

export default class ThemeBuilder<
    ColorNames extends string = ColorName,
    FontNames extends string = FontName,
    TextFormatNames extends string = TextFormatName,
    Sizes extends string = Size
> {
    constructor(readonly theme: Theme<ColorNames, FontNames, TextFormatNames, Sizes>) {}

    space(spacing: number) {
        return new ThemeBuilder({ ...this.theme, spacing })
    }

    color<Name extends string>(
        name: ColorNames | Name,
        build: (builder: ColorShadeListBuilder) => ColorShadeListBuilder,
    ) {
        const currentTheme = this.theme as Theme<
            ColorNames | Name,
            FontNames,
            TextFormatNames,
            Sizes
        >
        const existingShadeList = currentTheme.colors[name] ?? {}
        const newShadeList = build(new ColorShadeListBuilder(existingShadeList)).shadeList
        return new ThemeBuilder<ColorNames | Name, FontNames, TextFormatNames, Sizes>({
            ...currentTheme,
            colors: {
                ...currentTheme.colors,
                [name]: newShadeList,
            },
        })
    }

    fontSize(size: number) {
        return new ThemeBuilder({
            ...this.theme,
            typography: {
                ...this.theme.typography,
                size,
            },
        })
    }

    font<Name extends string>(
        name: FontNames | Name,
        build: (builder: FontBuilder) => FontBuilder,
    ) {
        const currentTheme = this.theme as Theme<
            ColorNames,
            FontNames | Name,
            TextFormatNames,
            Sizes
        >
        const existingFont = currentTheme.typography.fonts[name] ?? {}
        const newFont = build(new FontBuilder(existingFont)).font
        return new ThemeBuilder<ColorNames, FontNames | Name, TextFormatNames, Sizes>({
            ...currentTheme,
            typography: {
                ...currentTheme.typography,
                fonts: {
                    ...currentTheme.typography.fonts,
                    [name]: newFont,
                },
            },
        })
    }

    textStyle<Name extends string>(
        name: TextFormatNames | Name,
        build: (builder: TextFormatBuilder<FontNames>) => TextFormatBuilder<FontNames>,
    ) {
        const currentTheme = this.theme as Theme<
            ColorNames,
            FontNames,
            TextFormatNames | Name,
            Sizes
        >
        const existingFormat = currentTheme.typography.formats[name] ?? {}
        const newFormat = build(new TextFormatBuilder(existingFormat)).format
        return new ThemeBuilder<ColorNames, FontNames, TextFormatNames | Name, Sizes>({
            ...currentTheme,
            typography: {
                ...currentTheme.typography,
                formats: {
                    ...currentTheme.typography.formats,
                    [name]: newFormat,
                },
            },
        })
    }
}

export function createTheme<
    ColorNames extends string = ColorName,
    FontNames extends string = FontName,
    TextFormatNames extends string = TextFormatName,
    Sizes extends string = Size
>(theme: Theme<ColorNames, FontNames, TextFormatNames, Sizes>) {
    return new ThemeBuilder(theme)
}

export function createDefaultTheme() {
    return createTheme(defaultTheme)
}
