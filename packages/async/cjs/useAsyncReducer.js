"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAsyncReducer;

var _react = require("react");

var _createInitialAsyncState = _interopRequireDefault(require("./createInitialAsyncState"));

var _reduceAsyncState = _interopRequireDefault(require("./reduceAsyncState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a React reducer for an async state.
 *
 * @param initialValue The initial resolved value of the async state.
 */
function useAsyncReducer(initialValue) {
  return (0, _react.useReducer)(_reduceAsyncState.default, initialValue, _createInitialAsyncState.default);
}