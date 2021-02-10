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
