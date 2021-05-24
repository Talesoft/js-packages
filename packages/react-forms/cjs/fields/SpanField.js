"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpanField;

var _useFormContext = _interopRequireDefault(require("../forms/useFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SpanField({
  name,
  ...spanProps
}) {
  const {
    getFieldValue
  } = (0, _useFormContext.default)();
  return /*#__PURE__*/React.createElement("span", spanProps, getFieldValue(name !== null && name !== void 0 ? name : ''));
}