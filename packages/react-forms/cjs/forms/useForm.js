"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForm;

var _react = require("react");

var _createInitialFormState = _interopRequireDefault(require("./createInitialFormState"));

var _reduceForm = _interopRequireDefault(require("./reduceForm"));

var _createFormDispatchers = _interopRequireDefault(require("./createFormDispatchers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useForm(options) {
  const initialFormState = (0, _react.useMemo)(() => (0, _createInitialFormState.default)(options.initialValue), [options.initialValue]);
  const [state, dispatch] = (0, _react.useReducer)(_reduceForm.default, initialFormState);
  const dispatchers = (0, _react.useMemo)(() => (0, _createFormDispatchers.default)(options, state, dispatch), [options, state, dispatch]);
  return (0, _react.useMemo)(() => ({
    state,
    ...dispatchers
  }), [state, dispatchers]);
}