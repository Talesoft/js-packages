"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _colors = require("./colors");

Object.keys(_colors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _colors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _colors[key];
    }
  });
});

var _common = require("./common");

Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _common[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _converters = require("./converters");

Object.keys(_converters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _converters[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _converters[key];
    }
  });
});

var _expressions = require("./expressions");

Object.keys(_expressions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _expressions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _expressions[key];
    }
  });
});

var _mixers = require("./mixers");

Object.keys(_mixers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mixers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mixers[key];
    }
  });
});

var _schemes = require("./schemes");

Object.keys(_schemes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _schemes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _schemes[key];
    }
  });
});

var _spaces = require("./spaces");

Object.keys(_spaces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _spaces[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spaces[key];
    }
  });
});
var _default = _colors.Color;
exports.default = _default;