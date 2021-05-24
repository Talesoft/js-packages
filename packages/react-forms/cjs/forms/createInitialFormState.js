"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInitialFormState;

var _immutable = require("immutable");

var _common = require("../validation/common");

const createRecord = (0, _immutable.Record)({
  initialValue: {},
  value: (0, _immutable.Map)(),
  submitting: false,
  submitted: false,
  validationState: _common.ValidationState.NOT_VALIDATED,
  fieldStates: (0, _immutable.Map)()
});

function createInitialFormState(initialValue) {
  return createRecord({
    initialValue,
    value: (0, _immutable.fromJS)(initialValue)
  });
}