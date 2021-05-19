import { useReducer } from 'react'
import type { AsyncAction, AsyncDispatch } from './actions'
import createInitialAsyncState from './createInitialAsyncState'
import reduceAsyncState from './reduceAsyncState'
import type { AsyncState } from './states'

/**
 * Creates a React reducer for an async state.
 *
 * @param initialValue The initial resolved value of the async state.
 */
export default function useAsyncReducer<Value, ErrorValue>(
  initialValue: Value,
): readonly [AsyncState<Value, ErrorValue>, AsyncDispatch<Value, ErrorValue>] {
  const reduce = (state: AsyncState<Value, ErrorValue>, action: AsyncAction<Value, ErrorValue>) =>
    reduceAsyncState(state, action)
  return useReducer(reduce, initialValue, createInitialAsyncState)
}
