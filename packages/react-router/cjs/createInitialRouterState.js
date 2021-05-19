"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInitialRouterState;

/**
 * Creates the initial state for a router
 *
 * @param value The initial path of the router.
 */
function createInitialRouterState(initialPath) {
  return {
    path: initialPath,
    history: [initialPath],
    offset: 0,
    first: true,
    last: true
  };
}