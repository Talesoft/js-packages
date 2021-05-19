import { DependencyList, useCallback, useEffect } from 'react'
import { AsyncState } from './states'
import useAsyncState from './useAsyncState'

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
export default function useAsync<Value, ErrorValue>(
  loader: () => Promise<Value>,
  initialValue: Value,
  deps: DependencyList,
): AsyncState<Value, ErrorValue> {
  const cachedLoader = useCallback(loader, deps)
  const [state, load] = useAsyncState<Value, ErrorValue>(cachedLoader, initialValue)

  useEffect(() => {
    load()
  }, [load])

  return state
}
