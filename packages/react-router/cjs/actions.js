"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Pushes a new path to the router, navigating the app.
 */

/**
 * Pops a path from the router, removing it from the navigation stack.
 */

/**
 * Replaces the current router path with a new path without changing the history location.
 */

/**
 * A union that includes all possible actions on a router state.
 */

/**
 * The type of a dispatcher for a router.
 */

/**
 * An object containing all actions on routers.
 */
const actions = {
  push(path) {
    return {
      type: 'push',
      payload: {
        path
      }
    };
  },

  pop() {
    return {
      type: 'pop'
    };
  },

  replace(path) {
    return {
      type: 'replace',
      payload: {
        path
      }
    };
  },

  forward(steps = 1) {
    return {
      type: 'forward',
      payload: {
        steps
      }
    };
  },

  back(steps = 1) {
    return {
      type: 'back',
      payload: {
        steps
      }
    };
  }

};
var _default = actions;
exports.default = _default;