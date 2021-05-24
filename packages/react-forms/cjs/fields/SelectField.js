"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectField;

var _useField = _interopRequireDefault(require("./useField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SelectField(props) {
  var _props$name;

  const {
    value,
    setValue
  } = (0, _useField.default)((_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : '');
  return /*#__PURE__*/React.createElement("select", _extends({}, props, {
    value: value,
    onChange: event => setValue(props.multiple ? Array.from(event.target.options).filter(opt => opt.selected).map(opt => opt.value) : event.target.value)
  }));
}