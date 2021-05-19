"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduceAsyncState;

var _createInitialAsyncState = _interopRequireDefault(require("./createInitialAsyncState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transforms an async state based on an action.
 *
 * @param state The async state to transform.
 * @param action The action to transform the state with.
 */
function reduceAsyncState(state, action) {
  switch (action.type) {
    case 'reset':
      return (0, _createInitialAsyncState.default)(state.initialValue);

    case 'beginLoad':
      return { ...state,
        loading: true,
        error: undefined
      };

    case 'resolve':
      return { ...state,
        loading: false,
        loaded: true,
        value: action.payload.value,
        error: undefined
      };

    case 'reject':
      return { ...state,
        loading: false,
        loaded: true,
        error: action.payload.error
      };
  }
}