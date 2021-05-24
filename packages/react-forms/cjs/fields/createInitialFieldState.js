"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInitialFieldState;

var _immutable = require("immutable");

var _common = require("../validation/common");

const createRecord = (0, _immutable.Record)({
  errors: (0, _immutable.List)(),
  validationState: _common.ValidationState.NOT_VALIDATED,
  changed: false
});

function createInitialFieldState() {
  return createRecord();
}