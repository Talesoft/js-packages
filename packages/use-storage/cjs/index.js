"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useMemoryState: true,
  usePersistentState: true,
  useStoredState: true,
  useTemporaryState: true
};
Object.defineProperty(exports, "useMemoryState", {
  enumerable: true,
  get: function () {
    return _useMemoryState.default;
  }
});
Object.defineProperty(exports, "usePersistentState", {
  enumerable: true,
  get: function () {
    return _usePersistentState.default;
  }
});
Object.defineProperty(exports, "useStoredState", {
  enumerable: true,
  get: function () {
    return _useStoredState.default;
  }
});
Object.defineProperty(exports, "useTemporaryState", {
  enumerable: true,
  get: function () {
    return _useTemporaryState.default;
  }
});

var _storage = require("./storage");

Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _storage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _storage[key];
    }
  });
});

var _useMemoryState = _interopRequireDefault(require("./useMemoryState"));

var _usePersistentState = _interopRequireDefault(require("./usePersistentState"));

var _useStoredState = _interopRequireDefault(require("./useStoredState"));

var _useTemporaryState = _interopRequireDefault(require("./useTemporaryState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }