/**
 * The shape an async state has when it is new or reset.
 */
export interface InitialAsyncState<Value> {
  readonly initialValue: Value
  readonly loaded: false
  readonly loading: false
  readonly value: Value
  readonly error: undefined
}

/**
 * The shape an async state has when it is currently loading.
 */
export interface LoadingAsyncState<Value> {
  readonly initialValue: Value
  readonly loaded: boolean
  readonly loading: true
  readonly value: Value
  readonly error: undefined
}

/**
 * The shape an async state has when it is resolved.
 */
export interface ResolvedAsyncState<Value> {
  readonly initialValue: Value
  readonly loaded: true
  readonly loading: boolean
  readonly value: Value
  readonly error: undefined
}

/**
 * The shape an async state has when it is rejected.
 */
export interface RejectedAsyncState<Value, ErrorValue> {
  readonly initialValue: Value
  readonly loaded: true
  readonly loading: boolean
  readonly value: Value
  readonly error: ErrorValue
}

/**
 * A union of all possible shapes of an async state.
 */
export type AsyncState<Value, ErrorValue> =
  | InitialAsyncState<Value>
  | LoadingAsyncState<Value>
  | ResolvedAsyncState<Value>
  | RejectedAsyncState<Value, ErrorValue>

export function isInitial<Value, ErrorValue>(
  state: AsyncState<Value, ErrorValue>,
): state is InitialAsyncState<Value> {
  return state.loaded === false && state.loading === false && state.value === state.initialValue
}

export function isLoading<Value, ErrorValue>(
  state: AsyncState<Value, ErrorValue>,
): state is LoadingAsyncState<Value> {
  return state.loading === true
}

export function isResolved<Value, ErrorValue>(
  state: AsyncState<Value, ErrorValue>,
): state is ResolvedAsyncState<Value> {
  return state.loaded === true && state.loading === false && state.error === undefined
}

export function isRejected<Value, ErrorValue>(
  state: AsyncState<Value, ErrorValue>,
): state is RejectedAsyncState<Value, ErrorValue> {
  return state.loaded === true && state.loading === false && state.error !== undefined
}
