"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toSpace = toSpace;
exports.colorConverters = void 0;

var _colors = require("./colors");

var _spaces = require("./spaces");

const {
  min,
  max
} = Math;
const colorConverters = {
  // RGB
  [_spaces.ColorSpace.RGB]: {
    // RGB -> RGB
    [_spaces.ColorSpace.RGB]: color => new _colors.Color(_spaces.ColorSpace.RGB, [...color.data]),
    // RGB -> RGBA
    [_spaces.ColorSpace.RGBA]: color => new _colors.Color(_spaces.ColorSpace.RGBA, [...color.data, 1]),
    // RGB -> HSL
    [_spaces.ColorSpace.HSL]: color => {
      const [rScale, gScale, bScale] = (0, _spaces.getSpaceScales)(color.space);
      let [r, g, b] = color.data;
      r /= rScale;
      g /= gScale;
      b /= bScale;
      const maxValue = max(r, g, b);
      const minValue = min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (maxValue + minValue) / 2;

      if (maxValue !== minValue) {
        const d = maxValue - minValue;
        s = l > 0.5 ? d / (2 - maxValue - minValue) : d / (maxValue + minValue);

        switch (maxValue) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      const [hScale, sScale, lScale] = (0, _spaces.getSpaceScales)(_spaces.ColorSpace.HSL);
      return _colors.Color.hsl(h * hScale, s * sScale, l * lScale);
    },
    // RGB -> HSLA
    [_spaces.ColorSpace.HSLA]: color => new _colors.Color(_spaces.ColorSpace.HSLA, [...toSpace(color, _spaces.ColorSpace.HSL).data, 1])
  },
  // RGBA
  [_spaces.ColorSpace.RGBA]: {
    // RGBA -> RGB
    [_spaces.ColorSpace.RGB]: color => new _colors.Color(_spaces.ColorSpace.RGB, [...color.data.slice(0, 3)]),
    // RGBA -> RGBA
    [_spaces.ColorSpace.RGBA]: color => new _colors.Color(_spaces.ColorSpace.RGBA, [...color.data]),
    // RGBA -> HSL
    [_spaces.ColorSpace.HSL]: color => toSpace(toSpace(color, _spaces.ColorSpace.RGB), _spaces.ColorSpace.HSL),
    // RGBA -> HSLA
    [_spaces.ColorSpace.HSLA]: color => new _colors.Color(_spaces.ColorSpace.HSLA, [...toSpace(color, _spaces.ColorSpace.HSL).data, color.data[3]])
  },
  [_spaces.ColorSpace.HSL]: {
    // HSL -> RGB
    [_spaces.ColorSpace.RGB]: color => {
      const [hScale, sScale, lScale] = (0, _spaces.getSpaceScales)(color.space);
      let [h, s, l] = color.data;
      let r = 0;
      let g = 0;
      let b = 0;
      h /= hScale;
      s /= sScale;
      l /= lScale;

      if (s === 0.0) {
        r = l;
        g = l;
        b = l;
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = getRgbFromHue(p, q, h + 1 / 3);
        g = getRgbFromHue(p, q, h);
        b = getRgbFromHue(p, q, h - 1 / 3);
      }

      const [rScale, gScale, bScale] = (0, _spaces.getSpaceScales)(_spaces.ColorSpace.RGB);
      return _colors.Color.rgb(r * rScale, g * gScale, b * bScale);
    },
    // HSL -> RGBA
    [_spaces.ColorSpace.RGBA]: color => new _colors.Color(_spaces.ColorSpace.RGBA, [...toSpace(color, _spaces.ColorSpace.RGB).data, 1]),
    // HSL -> HSL
    [_spaces.ColorSpace.HSL]: color => new _colors.Color(_spaces.ColorSpace.HSL, [...color.data]),
    // HSL -> HSLA
    [_spaces.ColorSpace.HSLA]: color => new _colors.Color(_spaces.ColorSpace.HSLA, [...color.data, 1])
  },
  // HSLA
  [_spaces.ColorSpace.HSLA]: {
    // HSLA -> RGB
    [_spaces.ColorSpace.RGB]: color => toSpace(toSpace(color, _spaces.ColorSpace.HSL), _spaces.ColorSpace.RGB),
    // HSLA -> RGBA
    [_spaces.ColorSpace.RGBA]: color => new _colors.Color(_spaces.ColorSpace.RGBA, [...toSpace(color, _spaces.ColorSpace.RGB).data, color.data[3]]),
    // HSLA -> HSL
    [_spaces.ColorSpace.HSL]: color => new _colors.Color(_spaces.ColorSpace.HSL, [...color.data.slice(0, 3)]),
    // HSLA -> HSLA
    [_spaces.ColorSpace.HSLA]: color => new _colors.Color(_spaces.ColorSpace.HSLA, [...color.data])
  }
};
exports.colorConverters = colorConverters;

function toSpace(color, targetSpace) {
  if (color.space === targetSpace) {
    return color;
  }

  return colorConverters[color.space][targetSpace](color);
}

function getRgbFromHue(p, q, t) {
  let nt = t; // Normalize

  if (nt < 0) {
    nt += 1;
  } else if (nt > 1) {
    nt -= 1;
  }

  if (nt < 1 / 6) {
    return p + (q - p) * 6 * nt;
  }

  if (nt < 1 / 2) {
    return q;
  }

  if (nt < 2 / 3) {
    return p + (q - p) * (2 / 3 - nt) * 6;
  }

  return p;
}