"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotateValue = rotateValue;

function rotateValue(value, scale) {
  let rotatedValue = value;

  while (value > scale) {
    rotatedValue -= scale;
  }

  while (value < 0) {
    rotatedValue += scale;
  }

  return rotatedValue;
}