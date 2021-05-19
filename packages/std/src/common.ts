export type Func<ReturnValue, Arguments extends any[] = never[]> = (
    ...args: Arguments
) => ReturnValue
export type Action<Arguments extends any[]> = Func<void, Arguments>
export type Predicate<Value> = Func<boolean, [value: Value]>
export type Accumulator<ReturnValue, Value> = Func<ReturnValue, [carry: ReturnValue, value: Value]>

export interface Functor<Value> {
    map<MappedValue>(mapFn: (value: Value) => MappedValue): Functor<MappedValue>
    flatMap<MappedValue>(mapFn: (value: Value) => Functor<MappedValue>): Functor<MappedValue>
}
