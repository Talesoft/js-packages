"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFieldErrors;

var _immutable = require("immutable");

var _useFormContext = _interopRequireDefault(require("../forms/useFormContext"));

var _common = require("../validation/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFieldErrors(name) {
  var _fieldState$get, _fieldState$get2;

  const {
    state
  } = (0, _useFormContext.default)();
  const fieldState = state.getIn(['fieldStates', name]);
  const validationState = (_fieldState$get = fieldState === null || fieldState === void 0 ? void 0 : fieldState.get('validationState')) !== null && _fieldState$get !== void 0 ? _fieldState$get : _common.ValidationState.NOT_VALIDATED;
  const errors = (_fieldState$get2 = fieldState === null || fieldState === void 0 ? void 0 : fieldState.get('errors')) !== null && _fieldState$get2 !== void 0 ? _fieldState$get2 : (0, _immutable.List)();
  return {
    errors,
    validationState
  };
}