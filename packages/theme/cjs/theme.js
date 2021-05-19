"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.defaultTextFormat = void 0;

var _colors = require("./colors");

const defaultTextFormat = {
  font: 'text',
  lineHeight: 1.2,
  size: 1,
  style: 'normal',
  weight: 'normal',
  decoration: 'none'
};
exports.defaultTextFormat = defaultTextFormat;
const defaultTheme = {
  colors: {
    primary: (0, _colors.createColorShades)('#E94F4F'),
    secondary: (0, _colors.createColorShades)('#E9954F'),
    tertiary: (0, _colors.createColorShades)('#2F8C8C'),
    quartenary: (0, _colors.createColorShades)('#3FBA3F'),
    success: (0, _colors.createColorShades)('#0f0'),
    info: (0, _colors.createColorShades)('#0ff'),
    warning: (0, _colors.createColorShades)('#ff0'),
    danger: (0, _colors.createColorShades)('#00f')
  },
  typography: {
    size: 16,
    fonts: {
      text: {
        name: 'Open Sans',
        fallbacks: ['sans-serif'],
        url: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
      },
      design: {
        name: 'Open Sans',
        fallbacks: ['sans-serif'],
        url: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
      }
    },
    formats: {
      heading1: { ...defaultTextFormat,
        font: 'design',
        size: 2.5,
        weight: 'bold'
      },
      heading2: { ...defaultTextFormat,
        font: 'design',
        size: 2,
        weight: 'bold'
      },
      heading3: { ...defaultTextFormat,
        font: 'design',
        size: 1.6,
        weight: 'bold'
      },
      heading4: { ...defaultTextFormat,
        font: 'design',
        size: 1.3,
        weight: 'bold'
      },
      heading5: { ...defaultTextFormat,
        font: 'design',
        weight: 'bold'
      },
      heading6: { ...defaultTextFormat,
        font: 'design'
      },
      paragraph: defaultTextFormat,
      button: { ...defaultTextFormat,
        weight: 'bold'
      },
      input: defaultTextFormat,
      label: { ...defaultTextFormat,
        weight: 'bold'
      },
      link: defaultTextFormat
    },
    sizeFactors: {
      xxs: 0.5,
      xs: 0.7,
      s: 0.9,
      m: 1,
      l: 1.1,
      xl: 1.4,
      xxl: 1.7
    }
  },
  breakpoints: {
    xxs: 0,
    xs: 350,
    s: 576,
    m: 768,
    l: 1024,
    xl: 1200,
    xxl: 1600
  },
  maxWidths: {
    xxs: 400,
    xs: 620,
    s: 740,
    m: 1000,
    l: 1256,
    xl: 1400,
    xxl: 1800
  },
  spacing: 20,
  spacingFactors: {
    xxs: 1,
    xs: 2,
    s: 3,
    m: 4,
    l: 5,
    xl: 6,
    xxl: 7
  },
  borderWidths: {
    xxs: 1,
    xs: 2,
    s: 3,
    m: 4,
    l: 5,
    xl: 6,
    xxl: 7
  },
  borderRadius: 3
};
exports.defaultTheme = defaultTheme;