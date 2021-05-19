"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpaceMetadata = getSpaceMetadata;
exports.getSpaceChannelCount = getSpaceChannelCount;
exports.getSpaceScales = getSpaceScales;
exports.getSpaceUnits = getSpaceUnits;
exports.colorSpaces = exports.ColorUnit = exports.ColorSpace = void 0;

/**
 * The color spaces this library supports.
 */
let ColorSpace;
exports.ColorSpace = ColorSpace;

(function (ColorSpace) {
  ColorSpace["RGB"] = "rgb";
  ColorSpace["RGBA"] = "rgba";
  ColorSpace["HSL"] = "hsl";
  ColorSpace["HSLA"] = "hsla";
})(ColorSpace || (exports.ColorSpace = ColorSpace = {}));

/**
 * The unit of color values in color function expressions.
 */
let ColorUnit;
/**
 * The interface for color space metadata
 *
 * @see colorSpaces
 */

exports.ColorUnit = ColorUnit;

(function (ColorUnit) {
  ColorUnit["FIXED"] = "";
  ColorUnit["PERCENT"] = "%";
})(ColorUnit || (exports.ColorUnit = ColorUnit = {}));

/**
 * Metadata that is stored for each color space.
 *
 * It contains information about each specific color channel of the space.
 *
 * @see ColorSpace
 * @see ColorSpaceMetadata
 */
const colorSpaces = {
  [ColorSpace.RGB]: {
    channels: [{
      scale: 255,
      type: 'int',
      unit: ColorUnit.FIXED
    }, {
      scale: 255,
      type: 'int',
      unit: ColorUnit.FIXED
    }, {
      scale: 255,
      type: 'int',
      unit: ColorUnit.FIXED
    }]
  },
  [ColorSpace.RGBA]: {
    channels: [{
      scale: 255,
      type: 'int',
      unit: ColorUnit.FIXED
    }, {
      scale: 255,
      type: 'int',
      unit: ColorUnit.FIXED
    }, {
      scale: 255,
      type: 'int',
      unit: ColorUnit.FIXED
    }, {
      scale: 1,
      type: 'float',
      unit: ColorUnit.FIXED
    }]
  },
  [ColorSpace.HSL]: {
    channels: [{
      scale: 360,
      type: 'float',
      unit: ColorUnit.FIXED
    }, {
      scale: 1,
      type: 'float',
      unit: ColorUnit.PERCENT
    }, {
      scale: 1,
      type: 'float',
      unit: ColorUnit.PERCENT
    }]
  },
  [ColorSpace.HSLA]: {
    channels: [{
      scale: 360,
      type: 'float',
      unit: ColorUnit.FIXED
    }, {
      scale: 1,
      type: 'float',
      unit: ColorUnit.PERCENT
    }, {
      scale: 1,
      type: 'float',
      unit: ColorUnit.PERCENT
    }, {
      scale: 1,
      type: 'float',
      unit: ColorUnit.FIXED
    }]
  }
};
/**
 * Returns all metadata of the given color space.
 *
 * @param space A color space.
 */

exports.colorSpaces = colorSpaces;

function getSpaceMetadata(space) {
  const metadata = colorSpaces[space];

  if (!metadata) {
    throw new Error(`Color space ${space} has no defined metadata`);
  }

  return metadata;
}
/**
 * Returns the amount of color channels in a color space.
 *
 * @param space A color space.
 */


function getSpaceChannelCount(space) {
  return getSpaceMetadata(space).channels.length;
}
/**
 * Returns the value scales of a color space as an array.
 *
 * @param space A color space.
 */


function getSpaceScales(space) {
  return getSpaceMetadata(space).channels.map(c => c.scale);
}
/**
 * Returns the value units of a color space as an array.
 *
 * @param space A color space.
 */


function getSpaceUnits(space) {
  return getSpaceMetadata(space).channels.map(c => c.unit);
}