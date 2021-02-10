"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * An action to reset the async state.
 */

/**
 * An action to tell the async state that it started loading.
 */

/**
 * An action that resolves the async state to a resolved state (successful result).
 */

/**
 * An action that resolves the async state to a rejected state (error result).
 */

/**
 * A union that includes all possible actions on async states.
 */

/**
 * The type of a dispatcher for an async state.
 */

/**
 * An object containing all actions on async states.
 */
var _default = {
  /**
   * Resets the async state to its initial state.
   */
  reset() {
    return {
      type: 'reset'
    };
  },

  /**
   * Begins loading on the async state.
   */
  beginLoad() {
    return {
      type: 'beginLoad'
    };
  },

  /**
   * Resolves the async state to a value.
   *
   * @param value The value to resolve to.
   */
  resolve(value) {
    return {
      type: 'resolve',
      payload: {
        value
      }
    };
  },

  /**
   * Rejects the async state with an error.
   *
   * @param error The error to reject with
   */
  reject(error) {
    return {
      type: 'reject',
      payload: {
        error
      }
    };
  }

};
exports.default = _default;