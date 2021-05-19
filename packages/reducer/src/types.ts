export type Reducer<State, Action> = (state: State, action: Action) => State | Promise<State>
export type StateOfReducer<Value> = Value extends Reducer<infer State, any> ? State : unknown
export type ActionOfReducer<Value> = Value extends Reducer<any, infer Action> ? Action : unknown
export type ReducerList = Record<PropertyKey, Reducer<any, any>>
export type StateOfReducerList<Reducers extends ReducerList> = {
    [Key in keyof Reducers]: StateOfReducer<Reducers[Key]>
}
export type TypePayloadAction<Type, Payload = undefined> = Payload extends undefined
    ? { type: Type }
    : { type: Type; payload: Payload }
export type ChildAction<Key extends PropertyKey, Action> = TypePayloadAction<
    'reduceChild',
    { key: Key; action: Action }
>
