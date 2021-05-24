"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFormDispatchers;

var _immutable = require("immutable");

var _common = require("../validation/common");

function isYupValidationError(error) {
  /* We don't use instanceof to avoid a hard dependency on yup */
  return error.name === 'ValidationError';
}

function createValidator(options) {
  if (options.validate) {
    return options.validate;
  }

  const schema = options.validationSchema;

  if (!schema) {
    return undefined;
  }

  return async value => {
    try {
      await schema.validate(value, {
        abortEarly: false,
        recursive: true
      });
    } catch (err) {
      // Avoid hard dependency on yup
      if (!isYupValidationError(err)) {
        throw err;
      } // This is a yup error, extract the info and convert to own error layout


      return err.inner.reduce((errors, error) => {
        var _error$path, _errors, _error$path2;

        return { ...errors,
          [(_error$path = error.path) !== null && _error$path !== void 0 ? _error$path : '']: [...((_errors = errors[(_error$path2 = error.path) !== null && _error$path2 !== void 0 ? _error$path2 : '']) !== null && _errors !== void 0 ? _errors : []), {
            message: error.message,
            parameters: (0, _immutable.Map)()
          }]
        };
      }, {});
    }

    return {};
  };
  return undefined;
}

function createFormDispatchers(options, state, dispatch) {
  function getValue() {
    return state.get('value').toJS();
  }

  async function validate() {
    const value = getValue();
    const validateValue = createValidator(options);

    if (!validateValue) {
      return {
        value,
        validationState: _common.ValidationState.VALID,
        errors: {}
      };
    }

    const errors = await validateValue(value);
    const entries = Object.entries(errors);
    entries.forEach(([path, errors]) => dispatch({
      type: 'setFieldErrors',
      path,
      errors
    }));
    const validationState = entries.length > 0 ? _common.ValidationState.INVALID : _common.ValidationState.VALID;
    return {
      value,
      validationState,
      errors
    };
  }

  function registerField(path) {
    dispatch({
      type: 'registerField',
      path
    });
  }

  function unregisterField(path) {
    dispatch({
      type: 'unregisterField',
      path
    });
  }

  function getFieldValue(path) {
    return state.get('value').getIn(path.split('.'));
  }

  function setFieldValue(path, value) {
    dispatch({
      type: 'setFieldValue',
      path,
      value
    });
  }

  function reset() {
    dispatch({
      type: 'reset'
    });
  }

  function beginSubmit() {
    dispatch({
      type: 'beginSubmit'
    });
  }

  function finishSubmit() {
    dispatch({
      type: 'finishSubmit'
    });
  }

  async function submit() {
    beginSubmit();
    const {
      value,
      validationState
    } = await validate();

    if (validationState === _common.ValidationState.VALID) {
      var _options$onSubmit;

      await ((_options$onSubmit = options.onSubmit) === null || _options$onSubmit === void 0 ? void 0 : _options$onSubmit.call(options, value));
    }

    finishSubmit();
  }

  return {
    validate,
    registerField,
    unregisterField,
    getFieldValue,
    setFieldValue,
    reset,
    beginSubmit,
    finishSubmit,
    submit
  };
}