import type { Theme } from './theme'
import type { ColorName, ColorShades } from './colors'
import type { Size } from './common'
import { FontName, TextFormatName, Font, quoteFontName, TextFormat } from './typography'

function generateImport(url: string) {
    return `@import url('${url}');`
}

export function generateCssVariables<
    ColorNames extends string = ColorName,
    FontNames extends string = FontName,
    TextFormatNames extends string = TextFormatName,
    Sizes extends string = Size
>(
    theme: Theme<ColorNames, FontNames, TextFormatNames, Sizes>,
): ReadonlyArray<readonly [string, string]> {
    const colors = Object.entries(theme.colors) as [ColorNames, ColorShades][]
    const fonts = Object.entries(theme.typography.fonts) as [FontNames, Font][]
    const textFormats = Object.entries(theme.typography.formats) as [TextFormatNames, TextFormat][]
    return [
        colors.flatMap(([name, shades]) =>
            Object.entries(shades).map(([key, value]) => [`color-${name}-${key}`, value] as const),
        ),
        fonts.map(([name, font]) => [`font-${name}`, quoteFontName(font.name)] as const),
        textFormats.flatMap(([name, format]) => [
            [`text-${name}-size`, `${format.size}rem`] as const,
            [`text-${name}-line-height`, format.lineHeight.toString()] as const,
            [`text-${name}-weight`, format.weight] as const,
            [`text-${name}-style`, format.style] as const,
            [`text-${name}-decoration`, format.decoration] as const,
            [`text-${name}-font`, `var(--font-${format.font})`] as const,
        ]),
    ].flat()
}

export function generateCss<
    ColorNames extends string = ColorName,
    FontNames extends string = FontName,
    TextFormatNames extends string = TextFormatName,
    Sizes extends string = Size
>(theme: Theme<ColorNames, FontNames, TextFormatNames, Sizes>): string {
    const variables = generateCssVariables(theme)
    const fonts = Object.values(theme.typography.fonts) as Font[]
    const fontImports = fonts
        .filter(font => Boolean(font.url))
        .map(font => generateImport(font.url as string))
        .join('\n')
    return `
${fontImports}

:root {
    ${variables.map(([name, value]) => `--${name}: ${value};`).join('\n    ')}
}
`
}
