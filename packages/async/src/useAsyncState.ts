import useAsyncReducer from './useAsyncReducer'
import { useCallback } from 'react'
import actions from './actions'

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
export default function useAsyncState<Value, Args extends any[]>(
    loader: (...args: Args) => Promise<Value>,
    initialValue: Value,
) {
    const [state, dispatch] = useAsyncReducer(initialValue)
    const load = useCallback(
        (...args: Args) => {
            const promise = loader(...args)
            dispatch(actions.beginLoad())
            return promise
                .then(result => dispatch(actions.resolve(result)))
                .catch(error => dispatch(actions.reject(error)))
        },
        [dispatch, loader],
    )
    return [state, load] as const
}
