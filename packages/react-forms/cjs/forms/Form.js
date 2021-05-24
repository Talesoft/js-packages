"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Form;

var _react = require("react");

var _useForm = _interopRequireDefault(require("./useForm"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A container that provides the form context.
 *
 * It has to surround every single form.
 *
 * Form contexts _can_ be nested, but you won't be able to access the parent
 * context unless you forward it via props or another context.
 *
 * @param the parameters of this form
 * @returns a react element
 */
function Form({
  initialValue,
  onSubmit,
  validate,
  validationSchema,
  children
}) {
  const options = (0, _react.useMemo)(() => ({
    initialValue,
    onSubmit,
    validate,
    validationSchema
  }), [initialValue, onSubmit, validate, validationSchema]);
  const form = (0, _useForm.default)(options);
  return /*#__PURE__*/React.createElement(_FormContext.default.Provider, {
    value: form
  }, children);
}