"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduceForm;

var _createInitialFieldState = _interopRequireDefault(require("../fields/createInitialFieldState"));

var _createInitialFormState = _interopRequireDefault(require("./createInitialFormState"));

var _immutable = require("immutable");

var _common = require("../validation/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reduceForm(state, action) {
  var _errors$size;

  switch (action.type) {
    case 'reset':
      return (0, _createInitialFormState.default)(state.get('initialValue'));

    case 'beginSubmit':
      return state.set('submitting', true);

    case 'finishSubmit':
      return state.merge({
        submitted: true,
        submitting: false
      });

    case 'setFieldValue':
      const path = action.path.split('.');
      return state.update('value', value => value.setIn(path, action.value)).update('fieldStates', fieldStates => fieldStates.update(action.path, fieldState => fieldState.set('changed', true)));

    case 'registerField':
      return state.update('fieldStates', fieldStates => fieldStates.set(action.path, (0, _createInitialFieldState.default)()));

    case 'unregisterField':
      return state.update('fieldStates', fieldStates => fieldStates.delete(action.path));

    case 'setFieldErrors':
      const fieldStates = state.get('fieldStates');

      if (!fieldStates.has(action.path)) {
        throw new Error(`Failed to set errors for field ${action.path}: Field is not registered`);
      }

      const errors = (0, _immutable.List)(action.errors);
      const validationState = ((_errors$size = errors.size) !== null && _errors$size !== void 0 ? _errors$size : 0) > 0 ? _common.ValidationState.INVALID : _common.ValidationState.VALID;
      const newFieldStates = fieldStates.update(action.path, fieldState => fieldState.merge({
        errors,
        validationState: validationState
      }));
      return state.merge({
        fieldStates: newFieldStates,
        validationState: validationState === _common.ValidationState.INVALID ? _common.ValidationState.INVALID : state.get('validationState') === _common.ValidationState.NOT_VALIDATED ? _common.ValidationState.VALID : validationState
      });
  }
}