"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAsync;

var _react = require("react");

var _useAsyncState = _interopRequireDefault(require("./useAsyncState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an async bound state with dependencies that is simple to consume.
 *
 * The state will be reloaded whenever the dependencies change.
 *
 * Example:
 *
 * ```typescript
 * function MyComponent() {
 *     const { pageNumber } = useParams()
 *     const { loading, loaded, value, error } = useAsync(() => loadPage(pageNumber), undefined, [pageNumber])
 *
 *     return (
 *        <>
 *         {loading && (
 *             <Hint>Page is loading...</Hint>
 *         )}
 *         {loaded && error && (
 *             <Alert>Error loading value: {error}</Alert>
 *         )}
 *         {loaded && value && (
 *             <Content>{value.content}</Content>
 *         )}
 *       </>
 *     )
 * }
 * ```
 *
 * @param loader The loader that loads a value async.
 * @param initialValue The initial resolved value of the async state.
 * @param deps The dependencies that will make the loader reload.
 */
function useAsync(loader, initialValue, deps) {
  const cachedLoader = (0, _react.useCallback)(loader, deps);
  const [state, load] = (0, _useAsyncState.default)(cachedLoader, initialValue);
  (0, _react.useEffect)(() => {
    load();
  }, [load]);
  return state;
}