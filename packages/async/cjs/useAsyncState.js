"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAsyncState;

var _useAsyncReducer = _interopRequireDefault(require("./useAsyncReducer"));

var _react = require("react");

var _actions = _interopRequireDefault(require("./actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a simple combination of state and loader for a complex async state.
 *
 * Example:
 *
 * ```typescript
 * function MyComponent() {
 *     const [{ loading, loaded, value, error }, load] = useAsyncState(loadPage, undefined)
 *     const { pageNumber } = useParams()
 *
 *     useEffect(() => {
 *         load(pageNumber)
 *     }, [pageNumber])
 *
 *     return (
 *         {loading && (
 *             <Hint>Page is loading...</Hint>
 *         )}
 *         {loaded && error && (
 *             <Alert>Error loading value: {error}</Alert>
 *         )}
 *         {loaded && value && (
 *             <Content>{value.content}</Content>
 *         )}
 *     )
 * }
 * ```
 *
 * @param loader The loader that loads a value async.
 * @param initialValue The initial resolved value of the async state.
 */
function useAsyncState(loader, initialValue) {
  const [state, dispatch] = (0, _useAsyncReducer.default)(initialValue);
  const load = (0, _react.useCallback)((...args) => {
    const promise = loader(...args);
    dispatch(_actions.default.beginLoad());
    return promise.then(result => dispatch(_actions.default.resolve(result))).catch(error => dispatch(_actions.default.reject(error)));
  }, [dispatch, loader]);
  return [state, load];
}