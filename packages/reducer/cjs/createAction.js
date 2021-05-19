"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAction;

function createAction(type, payload) {
  if (payload === undefined) {
    return {
      type
    };
  }

  return {
    type,
    payload
  };
}