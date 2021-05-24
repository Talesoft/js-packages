"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useField;

var _react = require("react");

var _useFormContext = _interopRequireDefault(require("../forms/useFormContext"));

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useField(path) {
  const {
    registerField,
    unregisterField,
    getFieldValue,
    setFieldValue
  } = (0, _useFormContext.default)();
  (0, _react.useEffect)(() => {
    registerField(path);
    return () => unregisterField(path);
  }, [path]);
  const immutableValue = getFieldValue(path);
  return {
    immutableValue,

    get value() {
      return (0, _immutable.isImmutable)(immutableValue) ? immutableValue.toJS() : immutableValue;
    },

    setValue: newValue => setFieldValue(path, (0, _immutable.fromJS)(newValue))
  };
}