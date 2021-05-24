"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FieldArray;

var _useFieldArray = _interopRequireDefault(require("./useFieldArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FieldArray({
  name,
  children
}) {
  const dispatchers = (0, _useFieldArray.default)(name);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children(dispatchers));
}