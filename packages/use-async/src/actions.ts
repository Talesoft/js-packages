import { Dispatch } from 'react'

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

export type AsyncDispatch<Value, ErrorValue> = Dispatch<AsyncAction<Value, ErrorValue>>

/**
 * An object containing all actions on async states.
 */
const asyncActions = {
  /**
   * Resets the async state to its initial state.
   */
  reset(): ResetAsyncAction {
    return { type: 'reset' }
  },

  /**
   * Begins loading on the async state.
   */
  beginLoad(): BeginLoadAsyncAction {
    return { type: 'beginLoad' }
  },

  /**
   * Resolves the async state to a value.
   *
   * @param value The value to resolve to.
   */
  resolve<Value>(value: Value): ResolveAsyncAction<Value> {
    return { type: 'resolve', payload: { value } }
  },

  /**
   * Rejects the async state with an error.
   *
   * @param error The error to reject with
   */
  reject<ErrorValue>(error: ErrorValue): RejectAsyncAction<ErrorValue> {
    return { type: 'reject', payload: { error } }
  },
}

export default asyncActions
