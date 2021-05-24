"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormContext;

var _react = require("react");

var _FormContext = _interopRequireDefault(require("./FormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFormContext() {
  return (0, _react.useContext)(_FormContext.default);
}