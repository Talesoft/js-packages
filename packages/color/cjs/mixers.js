"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixRgbAdditive = mixRgbAdditive;
exports.mixRgbSubtractive = mixRgbSubtractive;
exports.mixRgbAverage = mixRgbAverage;
exports.mix = mix;
exports.MixMode = void 0;

var _colors = require("./colors");

var _spaces = require("./spaces");

const {
  min
} = Math;
let MixMode;
exports.MixMode = MixMode;

(function (MixMode) {
  MixMode["RGB_ADDITIVE"] = "rgbAdditive";
  MixMode["RGB_SUBTRACTIVE"] = "rgbSubtractive";
  MixMode["RGB_AVERAGE"] = "rgbAverage";
})(MixMode || (exports.MixMode = MixMode = {}));

function mixRgbAdditive(color, mixColor) {
  const [r, g, b, a = 1] = (0, _colors.toAnyRgb)(color).data;
  const [mixR, mixG, mixB, mixA = 1] = (0, _colors.toAnyRgb)(mixColor).data;
  const [rScale, gScale, bScale, aScale] = (0, _spaces.getSpaceScales)(_spaces.ColorSpace.RGBA);
  const mixedR = min(rScale, r + mixR);
  const mixedG = min(gScale, g + mixG);
  const mixedB = min(bScale, b + mixB);
  const mixedA = min(aScale, (a + mixA) / 2);
  return mixedA < 1 ? _colors.Color.rgba(mixedR, mixedG, mixedB, mixedA) : _colors.Color.rgb(mixedR, mixedG, mixedB);
}

function mixRgbSubtractive(color, mixColor) {
  const [r, g, b, a = 1] = (0, _colors.toAnyRgb)(color).data;
  const [mixR, mixG, mixB, mixA = 1] = (0, _colors.toAnyRgb)(mixColor).data;
  const [rScale, gScale, bScale, aScale] = (0, _spaces.getSpaceScales)(_spaces.ColorSpace.RGBA);
  const mixedR = min(rScale, r * mixR / rScale);
  const mixedG = min(gScale, g * mixG / gScale);
  const mixedB = min(bScale, b * mixB / bScale);
  const mixedA = min(aScale, (a + mixA) / 2);
  return mixedA < 1 ? _colors.Color.rgba(mixedR, mixedG, mixedB, mixedA) : _colors.Color.rgb(mixedR, mixedG, mixedB);
}

function mixRgbAverage(color, mixColor) {
  const [r, g, b, a = 1] = (0, _colors.toAnyRgb)(color).data;
  const [mixR, mixG, mixB, mixA = 1] = (0, _colors.toAnyRgb)(mixColor).data;
  const [rScale, gScale, bScale, aScale] = (0, _spaces.getSpaceScales)(_spaces.ColorSpace.RGBA);
  const mixedR = min(rScale, (r + mixR) / 2);
  const mixedG = min(gScale, (g + mixG) / 2);
  const mixedB = min(bScale, (b + mixB) / 2);
  const mixedA = min(aScale, (a + mixA) / 2);
  return mixedA < 1 ? _colors.Color.rgba(mixedR, mixedG, mixedB, mixedA) : _colors.Color.rgb(mixedR, mixedG, mixedB);
}

function mix(color, mixColor, mode = MixMode.RGB_SUBTRACTIVE) {
  switch (mode) {
    case MixMode.RGB_ADDITIVE:
      return mixRgbAdditive(color, mixColor);

    case MixMode.RGB_SUBTRACTIVE:
      return mixRgbSubtractive(color, mixColor);

    case MixMode.RGB_AVERAGE:
      return mixRgbAverage(color, mixColor);
  }
}