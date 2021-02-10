import type { AsyncAction } from './actions'
import createInitialAsyncState from './createInitialAsyncState'
import type {
    AsyncState,
    LoadingAsyncState,
    RejectedAsyncState,
    ResolvedAsyncState,
} from './states'

/**
 * Transforms an async state based on an action.
 *
 * @param state The async state to transform.
 * @param action The action to transform the state with.
 */
export default function reduceAsyncState<Value, ErrorValue>(
    state: AsyncState<Value, ErrorValue>,
    action: AsyncAction<Value, ErrorValue>,
) {
    switch (action.type) {
        case 'reset':
            return createInitialAsyncState(state.initialValue)
        case 'beginLoad':
            return {
                ...state,
                loading: true,
                error: undefined,
            } as LoadingAsyncState<Value>
        case 'resolve':
            return {
                ...state,
                loading: false,
                loaded: true,
                value: action.payload.value,
                error: undefined,
            } as ResolvedAsyncState<Value>
        case 'reject':
            return {
                ...state,
                loading: false,
                loaded: true,
                error: action.payload.error,
            } as RejectedAsyncState<Value, ErrorValue>
    }
}
