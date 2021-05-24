"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationState = void 0;
let ValidationState;
exports.ValidationState = ValidationState;

(function (ValidationState) {
  ValidationState["NOT_VALIDATED"] = "notValidated";
  ValidationState["VALID"] = "valid";
  ValidationState["INVALID"] = "invalid";
})(ValidationState || (exports.ValidationState = ValidationState = {}));