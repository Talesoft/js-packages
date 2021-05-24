"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorMessage;

var _common = require("../validation/common");

var _useFieldErrors = _interopRequireDefault(require("./useFieldErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorMessage({
  name
}) {
  const {
    errors,
    validationState
  } = (0, _useFieldErrors.default)(name);

  if (validationState !== _common.ValidationState.INVALID || errors.size < 1) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, errors.get(0));
}