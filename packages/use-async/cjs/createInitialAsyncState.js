"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInitialAsyncState;

/**
 * Creates the initial form of an async state.
 *
 * @param value The initial resolved value of the state.
 */
function createInitialAsyncState(value) {
  return {
    value,
    initialValue: value,
    loaded: false,
    loading: false,
    error: undefined
  };
}