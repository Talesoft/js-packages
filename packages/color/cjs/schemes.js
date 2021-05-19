"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateColors = generateColors;
exports.createScheme = createScheme;
exports.createLightShadeScheme = createLightShadeScheme;
exports.createDarkShadeScheme = createDarkShadeScheme;
exports.createShadeScheme = createShadeScheme;
exports.createComplementaryScheme = createComplementaryScheme;
exports.createAnalogousComplementaryScheme = createAnalogousComplementaryScheme;
exports.createSplitComplementaryScheme = createSplitComplementaryScheme;
exports.createTriadicComplementaryScheme = createTriadicComplementaryScheme;
exports.createSquareComplementaryScheme = createSquareComplementaryScheme;
exports.createTetradicComplementaryScheme = createTetradicComplementaryScheme;

var _colors = require("./colors");

function* generateColors(color, generate, options) {
  const {
    start = 0,
    step = 0.1,
    length = 5
  } = options !== null && options !== void 0 ? options : {};

  for (let index = 0; index < length; index += 1) {
    yield generate(color, start + index * step);
  }
}

function createScheme(color, keys, generate, options) {
  const genOptions = { ...options,
    length: keys.length
  };
  return Object.fromEntries(Array.from(generateColors(color, generate, genOptions), (color, index) => [keys[index], color]));
}

function createLightShadeScheme(color, options) {
  return createScheme(color, ['normal', 'light', 'lighter', 'lightest'], _colors.lighten, options);
}

function createDarkShadeScheme(color, options) {
  return createScheme(color, ['normal', 'dark', 'darker', 'darkest'], _colors.darken, options);
}

function createShadeScheme(color, options) {
  return { ...createLightShadeScheme(color, options),
    ...createDarkShadeScheme(color, options)
  };
}

function createComplementaryScheme(color) {
  // TODO: Use HSL scales for 180
  return createScheme(color, ['primary', 'secondary'], _colors.complement, {
    step: 180
  });
}

function createAnalogousComplementaryScheme(color) {
  // TODO: Use HSL scales for -30 and 30
  return createScheme(color, ['tertiary', 'primary', 'secondary'], _colors.complement, {
    start: -30,
    step: 30
  });
}

function createSplitComplementaryScheme(color) {
  // TODO: Use HSL scales for -150 and 150
  return createScheme(color, ['tertiary', 'primary', 'secondary'], _colors.complement, {
    start: -150,
    step: 150
  });
}

function createTriadicComplementaryScheme(color) {
  // TODO: Use HSL scales for -120 and 120
  return createScheme(color, ['tertiary', 'primary', 'secondary'], _colors.complement, {
    start: -120,
    step: 120
  });
}

function createSquareComplementaryScheme(color) {
  // TODO: Use HSL scales for 90
  return createScheme(color, ['primary', 'secondary', 'tertiary', 'quartenary'], _colors.complement, {
    step: 90
  });
}

function createTetradicComplementaryScheme(color) {
  // TODO: Use HSL scales
  return {
    primary: color,
    secondary: (0, _colors.complement)(color, 120),
    tertiary: (0, _colors.complement)(color, 180),
    quartenary: (0, _colors.complement)(color, -60)
  };
}