"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRouterContext;
exports.RouterProvider = void 0;

var _react = require("react");

var _createInitialRouterState = _interopRequireDefault(require("./createInitialRouterState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Context = /*#__PURE__*/(0, _react.createContext)([(0, _createInitialRouterState.default)('/'), () => undefined]);
const RouterProvider = Context.Provider;
exports.RouterProvider = RouterProvider;

function useRouterContext() {
  return (0, _react.useContext)(Context);
}