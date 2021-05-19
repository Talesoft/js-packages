Color JS
========

A color manipulation and conversion library.

It's supposed to ease up creation of JS-based frontend themes when using CSS in JavaScript.

It's written for React's Styled Components and Emotion CSS and designed to work well with it,
but does work well anywhere where you need color manipulation and automatic
generation of color schemes.

What can it do
==============

- **Parsing of different color formats**
  - **866** different color names ([List](https://github.com/codebrainz/color-names/blob/master/output/colors.csv))
  - Hexadecimal colors (e.g. `#f0a` or `#ef0bac`)
  - CSS color functions (e.g. `rgb(255, 127, 0)` or `hsla(180, 1, .5)`)
- **Convert colors between different color spaces. Supported/planned spaces:**
  - [x] RGB/RGBA
  - [x] HSL/HSLA
  - [ ] HSV/HSVA
  - [ ] CMYK Approximation
  - [ ] CIE-XYZ
  - [ ] CIE-LAB
- **Retrieving information from colors**
  - Get RGB information (amount of red, green and blue)
  - Get HSL information (hue/color tone, saturation, lightness)
  - Get alpha information (transparency)
- **Color manipulation**
  - darken, lighten, saturate and desaturate colors
  - Change color properties like the amount of red or green
  - inverse and mix colors
  - Change transparency of colors (fade in, fade out)
  - Generate complementary or similar colors
- **Easily generate color schemes and palettes from base colors**
  - Complementary schemes (playing with hues)
  - Shades, tints and tones of colors

Installation
------------

Yarn:

```bash
yarn add @talesoft/color
```

NPM:

```bash
npm i @talesoft/color
```

TypeScript Types included.

Usage
-----

Directly access known colors and manipulate them:

```typescript
import Color from '@talesoft/color'

const darkRed = Color.red.darken(.2)
console.log(`Dark red is: ${darkRed}`) // "Dark red is: #900"
```

Works well with e.g. Styled-Components/Emotion CSS for React:

```typescript
const StyledDiv = styled.div`
    background-color: ${Color.mediumCarmine.darken(.1).fadeOut(.2)};
    color: ${Color.palatinatePurple};
`
```

Use `Color.parse` function to quickly parse and modify own colors.

```typescript
import Color from '@talesoft/color'

const darkRed = Color.parse('#f00')
    .darken(.2)

console.log(`Dark red is: ${darkRed}`)
```

`Color.parse` and `dye` support most commonly known ways to write colors

```typescript
import Color, { dye } from '@talesoft/color'

const red = Color.parse('#f00')

const green = Color.parse('#00ff00')

const green = Color.parse('green')

const yellow = Color.parse('rgb(255, 255, 0)')

const redToo = Color.parse('hsl(0, 1, .5)')

// Percent values are allowed anywhere

const redAgain = Color.parse('rgb(100%, 0%, 0%)')
```

Pick from a growing list of color manipulation functions. Don't worry about color spaces. All operations are immutable.

```typescript
const color = Color.pastelYellow

// Get RGB Values
console.log(color.red, color.green, color.blue) // 253, 253, 150

// Get HSL Values
console.log(color.hue, color.saturation, color.lightness) // 60, 0.790..., 0.962...

// Get the transparency/opacity
console.log(color.opacity) // 1

// Modify Red value
color = color.withRed(255)

// Modify Green Value
color = color.withGreen(255)

// Modify Blue value
color = color.withBlue(255)

// Modify Hue value (color tone)
color = color.withHue(180)

// Modify saturation
color = color.withSaturation(.4)

// Modify lightness
color = color.withLightness(.2)

// Modify opacity/transparency
color = color.withOpacity(.5)

// Get complementary color
color = color.complement()

// Mix colors
color = color.mix(Color.red) // Using subtractive model by default
color = color.mix(Color.red, MixMode.RGB_ADDITIVE)

// Lighten/darken a color
color = color.lighten(.1)
color = color.darken(.2)

// Tint or tone colors (increase or decrease saturation)
color = color.tint(.1)
color = color.tone(.2)

// Invert a color
color = color.invert()

// Get the grayscale version of color
color = color.grayscale()

// Increase/decrease opacity of a color
color = color.fadeIn(.2)
color = color.fadeOut(.1)

// Cast to strings/output
console.log(color.toFunctionExpression()) // e.g. "rgb(255,43,45)"
console.log(color.toHexExpression()) // e.g. "#34ca3f"

// Perfectly fitting string representation for CSS
console.log(color.toString())
console.log(`Color: ${color}`)
```

Easily create automatically generated color schemes from your colors:

```typescript
import { dye } from '@talesoft/color';

const { primary, secondary } = Color.parse('#f00').complements
// primary will be red, secondary will be green (the complementary color)

const shadesOfGrey = Color.gray.shades
shadesOfGrey.lightest
shadesOfGrey.lighter
shadesOfGrey.light
shadesOfGrey.normal
shadesOfGrey.dark
shadesOfGrey.darker
shadesOfGrey.darkest

// Complex hue rotation schemes are supported
const {
    primary,
    secondary,
    tertiary,
    quartenary
} = Color.parse('#ce5a62').tetradicComplements

// Easily run your own scheme
import { darken } from '@talesoft/color';

const { firstShade, secondShade, thirdShade } = Color.parse('#ce5a62')
    .createScheme(
        ['firstShade','secondShade','thirdShade'],
        darken,
        { start: .2, step: .2 },
    )
```
