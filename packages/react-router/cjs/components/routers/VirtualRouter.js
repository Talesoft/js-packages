"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VirtualRouter;

var _react = _interopRequireDefault(require("react"));

var _useRouterContext = require("../../useRouterContext");

var _useRouterReducer = _interopRequireDefault(require("../../useRouterReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VirtualRouter({
  children
}) {
  const stateDispatchTuple = (0, _useRouterReducer.default)('/');
  return /*#__PURE__*/_react.default.createElement(_useRouterContext.RouterProvider, {
    value: stateDispatchTuple
  }, children);
}