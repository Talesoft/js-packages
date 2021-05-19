"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCssVariables = generateCssVariables;
exports.generateCss = generateCss;

var _typography = require("./typography");

function generateImport(url) {
  return `@import url('${url}');`;
}

function generateCssVariables(theme) {
  const colors = Object.entries(theme.colors);
  const fonts = Object.entries(theme.typography.fonts);
  const textFormats = Object.entries(theme.typography.formats);
  return [colors.flatMap(([name, shades]) => Object.entries(shades).map(([key, value]) => [`color-${name}-${key}`, value])), fonts.map(([name, font]) => [`font-${name}`, (0, _typography.quoteFontName)(font.name)]), textFormats.flatMap(([name, format]) => [[`text-${name}-size`, `${format.size}rem`], [`text-${name}-line-height`, format.lineHeight.toString()], [`text-${name}-weight`, format.weight], [`text-${name}-style`, format.style], [`text-${name}-decoration`, format.decoration], [`text-${name}-font`, `var(--font-${format.font})`]])].flat();
}

function generateCss(theme) {
  const variables = generateCssVariables(theme);
  const fonts = Object.values(theme.typography.fonts);
  const fontImports = fonts.filter(font => Boolean(font.url)).map(font => generateImport(font.url)).join('\n');
  return `
${fontImports}

:root {
    ${variables.map(([name, value]) => `--${name}: ${value};`).join('\n    ')}
}
`;
}