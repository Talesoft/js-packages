"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWindows;

function isWindows() {
  var _process$env$OSTYPE;

  return process.platform === 'win32' || /^(msys|cygwin)$/.test((_process$env$OSTYPE = process.env.OSTYPE) !== null && _process$env$OSTYPE !== void 0 ? _process$env$OSTYPE : '');
}