import type { InitialAsyncState } from './states'

/**
 * Creates the initial form of an async state.
 *
 * @param value The initial resolved value of the state.
 */
export default function createInitialAsyncState<Value>(value: Value) {
    return {
        value,
        initialValue: value,
        loaded: false,
        loading: false,
        error: undefined,
    } as InitialAsyncState<Value>
}
