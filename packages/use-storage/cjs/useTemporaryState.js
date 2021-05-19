"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTemporaryState;

var _useStoredState = _interopRequireDefault(require("./useStoredState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useTemporaryState(key, initialValue) {
  return (0, _useStoredState.default)('temporary', key, initialValue);
}