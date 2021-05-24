"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createInitialFormState = _interopRequireDefault(require("./createInitialFormState"));

var _react = require("react");

var _createFormDispatchers = _interopRequireDefault(require("./createFormDispatchers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialFormOptions = {
  initialValue: {}
};
const initialFormState = (0, _createInitialFormState.default)(initialFormOptions.initialValue);
const initialContext = {
  state: initialFormState,
  ...(0, _createFormDispatchers.default)(initialFormOptions, initialFormState, () => undefined)
};
const FormContext = /*#__PURE__*/(0, _react.createContext)(initialContext);
var _default = FormContext;
exports.default = _default;