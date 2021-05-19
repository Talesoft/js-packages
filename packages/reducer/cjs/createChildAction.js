"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inChild;

function inChild(key, action) {
  return {
    type: 'reduceChild',
    payload: {
      key,
      action
    }
  };
}