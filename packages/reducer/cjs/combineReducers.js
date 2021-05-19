"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineReducers;

function combineReducers(reducers) {
  async function reduce(state, action) {
    const childState = state[action.payload.key];
    const reduceChild = reducers[action.payload.key];

    if (!reduceChild) {
      throw new Error(`Can't reduce child ${action.payload.key}: No child reducer defined.`);
    }

    const newChildState = await reduceChild(childState, action.payload.action);

    if (childState === newChildState) {
      return state;
    }

    return { ...state,
      [action.payload.key]: newChildState
    };
  }

  return reduce;
}