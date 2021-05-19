import useAsyncReducer from './useAsyncReducer'
import { useCallback } from 'react'
import asyncActions from './actions'
import { AsyncState } from './states'

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
 */
export default function useAsyncState<Value, ErrorValue, Args extends any[] = []>(
  loader: (...args: Args) => Promise<Value>,
  initialValue: Value,
): readonly [AsyncState<Value, ErrorValue>, (...args: Args) => Promise<void>] {
  const [state, dispatch] = useAsyncReducer<Value, ErrorValue>(initialValue)
  const load = useCallback(
    (...args: Args) => {
      dispatch(asyncActions.beginLoad())
      return loader(...args)
        .then(result => dispatch(asyncActions.resolve(result)))
        .catch(error => dispatch(asyncActions.reject(error)))
    },
    [dispatch, loader],
  )
  return [state, load]
}
