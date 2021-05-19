"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePersistentState;

var _useStoredState = _interopRequireDefault(require("./useStoredState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function usePersistentState(key, initialValue) {
  return (0, _useStoredState.default)('persistent', key, initialValue);
}