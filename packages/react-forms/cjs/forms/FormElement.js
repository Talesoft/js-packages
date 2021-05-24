"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormElement;

var _react = require("react");

var _useFormContext = _interopRequireDefault(require("./useFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function FormElement({
  children,
  ...formProps
}) {
  const {
    submit,
    reset
  } = (0, _useFormContext.default)();
  const onSubmit = (0, _react.useCallback)(event => {
    event.preventDefault();
    submit();
  }, [submit]);
  const onReset = (0, _react.useCallback)(event => {
    event.preventDefault();
    reset();
  }, [reset]);
  return /*#__PURE__*/React.createElement("form", _extends({
    noValidate: true,
    onSubmit: onSubmit,
    onReset: onReset
  }, formProps), children);
}