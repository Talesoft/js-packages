"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorMessageList;

var _useFieldErrors = _interopRequireDefault(require("./useFieldErrors"));

var _common = require("../validation/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorMessageList({
  name,
  ...ulProps
}) {
  const {
    errors,
    validationState
  } = (0, _useFieldErrors.default)(name);

  if (validationState !== _common.ValidationState.INVALID || errors.size < 1) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  return /*#__PURE__*/React.createElement("ul", ulProps, errors.map((error, key) => /*#__PURE__*/React.createElement("li", {
    key: key
  }, error.message)));
}