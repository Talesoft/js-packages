"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tryCatch;

function tryCatch(handler, errorHandler) {
  'hide source';

  try {
    return handler();
  } catch (error) {
    return errorHandler === undefined ? error : errorHandler(error);
  }
}