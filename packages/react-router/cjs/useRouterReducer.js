"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRouterReducer;

var _react = require("react");

var _createInitialRouterState = _interopRequireDefault(require("./createInitialRouterState"));

var _reduceRouterState = _interopRequireDefault(require("./reduceRouterState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a React reducer for a router state.
 *
 * @param initialPath The initial path of the router state.
 */
function useRouterReducer(initialPath = '/') {
  return (0, _react.useReducer)(_reduceRouterState.default, initialPath, _createInitialRouterState.default);
}