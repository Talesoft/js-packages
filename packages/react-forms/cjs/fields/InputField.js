"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InputField;

var _useField = _interopRequireDefault(require("./useField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function toScriptValue(target) {
  var _target$files$, _target$files;

  switch (target.type) {
    case 'file':
      return target.multiple ? target.files : (_target$files$ = (_target$files = target.files) === null || _target$files === void 0 ? void 0 : _target$files[0]) !== null && _target$files$ !== void 0 ? _target$files$ : null;

    case 'checkbox':
      return target.checked;

    case 'number':
    case 'range':
      return target.value !== '' ? target.valueAsNumber : null;

    case 'time':
    case 'date':
    case 'datetime-local':
      return target.value !== '' ? Math.floor(target.valueAsNumber / 1000) : null;

    default:
      return target.value;
  }
}

function toFieldValueProps(inputProps, value) {
  var _value$toString;

  switch (inputProps.type) {
    case 'file':
      return {};

    case 'checkbox':
      return {
        checked: !!value
      };

    case 'radio':
      return {
        checked: value === inputProps.value
      };

    case 'number':
    case 'range':
      return {
        value: value !== null ? parseInt(value.toString(), 10) : ''
      };

    case 'time':
      return {
        value: value !== null ? new Date(value * 1000).toISOString().substr(11, 8) : ''
      };

    case 'date':
      return {
        value: value !== null ? new Date(value * 1000).toISOString().substr(0, 10) : ''
      };

    case 'datetime-local':
      return {
        value: value !== null ? new Date(value * 1000).toISOString().substr(0, 19) : ''
      };

    default:
      return {
        value: (_value$toString = value === null || value === void 0 ? void 0 : value.toString()) !== null && _value$toString !== void 0 ? _value$toString : ''
      };
  }
}

function InputField(props) {
  var _props$name;

  const {
    value,
    setValue
  } = (0, _useField.default)((_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : '');
  const valueProps = toFieldValueProps(props, value);
  return /*#__PURE__*/React.createElement("input", _extends({}, props, valueProps, {
    onChange: event => setValue(toScriptValue(event.target))
  }));
}