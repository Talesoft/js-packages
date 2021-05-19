"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInitial = isInitial;
exports.isLoading = isLoading;
exports.isResolved = isResolved;
exports.isRejected = isRejected;

/**
 * The shape an async state has when it is new or reset.
 */

/**
 * The shape an async state has when it is currently loading.
 */

/**
 * The shape an async state has when it is resolved.
 */

/**
 * The shape an async state has when it is rejected.
 */

/**
 * A union of all possible shapes of an async state.
 */
function isInitial(state) {
  return state.loaded === false && state.loading === false && state.value === state.initialValue;
}

function isLoading(state) {
  return state.loading === true;
}

function isResolved(state) {
  return state.loaded === true && state.loading === false && state.error === undefined;
}

function isRejected(state) {
  return state.loaded === true && state.loading === false && state.error !== undefined;
}