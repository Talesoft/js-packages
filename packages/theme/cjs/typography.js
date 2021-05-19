"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quoteFontName = quoteFontName;
exports.textWeightMap = void 0;
const textWeightMap = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900
};
exports.textWeightMap = textWeightMap;

function quoteFontName(name) {
  return name.indexOf(' ') === -1 ? name : `"${name}"`;
}