import type { Dispatch } from 'react'

/**
 * An action to reset the async state.
 */
export type ResetAsyncAction = { readonly type: 'reset' }

/**
 * An action to tell the async state that it started loading.
 */
export type BeginLoadAsyncAction = { readonly type: 'beginLoad' }

/**
 * An action that resolves the async state to a resolved state (successful result).
 */
export type ResolveAsyncAction<Value> = {
    readonly type: 'resolve'
    readonly payload: { readonly value: Value }
}

/**
 * An action that resolves the async state to a rejected state (error result).
 */
export type RejectAsyncAction<ErrorValue> = {
    readonly type: 'reject'
    readonly payload: { readonly error: ErrorValue }
}

/**
 * A union that includes all possible actions on async states.
 */
export type AsyncAction<Value, ErrorValue> =
    | ResetAsyncAction
    | BeginLoadAsyncAction
    | ResolveAsyncAction<Value>
    | RejectAsyncAction<ErrorValue>

/**
 * The type of a dispatcher for an async state.
 */
export type AsyncDispatch<Value, ErrorValue> = Dispatch<AsyncAction<Value, ErrorValue>>

/**
 * An object containing all actions on async states.
 */
export default {
    /**
     * Resets the async state to its initial state.
     */
    reset() {
        return { type: 'reset' } as ResetAsyncAction
    },

    /**
     * Begins loading on the async state.
     */
    beginLoad() {
        return { type: 'beginLoad' } as BeginLoadAsyncAction
    },

    /**
     * Resolves the async state to a value.
     *
     * @param value The value to resolve to.
     */
    resolve<Value>(value: Value) {
        return { type: 'resolve', payload: { value } } as ResolveAsyncAction<Value>
    },

    /**
     * Rejects the async state with an error.
     *
     * @param error The error to reject with
     */
    reject<ErrorValue>(error: ErrorValue) {
        return { type: 'reject', payload: { error } } as RejectAsyncAction<ErrorValue>
    },
}
