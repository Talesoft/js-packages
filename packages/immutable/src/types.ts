export type Reducer<State, Action> = (state: State, action: Action) => State
export type ReducerState<Value> = Value extends Reducer<infer State, any> ? State : unknown
export type ReducerAction<Value> = Value extends Reducer<any, infer Action> ? Action : unknown
export type ReducerList = {
    [Key in PropertyKey]: Reducer<any, any>
}
export type ReducerListState<Reducers extends ReducerList> = {
    [Key in keyof Reducers]: ReducerState<Reducers[Key]>
}
export type ChildAction<Key extends PropertyKey, Action> = {
    type: 'reduceChild'
    payload: { key: Key; action: Action }
}
