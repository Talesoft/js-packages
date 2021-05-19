"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createColorShades = createColorShades;

var _color = _interopRequireWildcard(require("@talesoft/color"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function* generateColorShades(colorString, length = 10, spread = 0.1) {
  const color = _color.default.parse(colorString);

  const half = Math.floor(length / 2);
  const lastHalf = half % 2 !== 0 ? half : half - 1;
  yield* (0, _color.generateColors)(color, _color.lighten, {
    length: half,
    step: -spread
  });
  yield colorString;
  yield* (0, _color.generateColors)(color, _color.darken, {
    length: lastHalf,
    step: spread,
    start: spread
  });
}

function createColorShades(color, length = 10, spread = 0.1) {
  return Object.fromEntries(Array.from(generateColorShades(color, length, spread), (color, index) => [Math.floor(index / length * 100), color.toString()]));
}