import { Accumulator, Func, Functor, Predicate } from './common'
import { None, Option, optionOfNullable, Some } from './options'

export interface ListOps<Value> extends Functor<Value>, Iterable<Value> {
    [Symbol.iterator](): Iterator<Value>
    isEmpty(): boolean

    map<MappedValue>(mapFn: Func<MappedValue, [value: Value]>): List<MappedValue>
    flatMap<MappedValue>(mapFn: Func<List<MappedValue>, [value: Value]>): List<MappedValue>
    filter(predicate: Predicate<Value>): List<Value>
    reduce<ReturnValue>(accumulator: Accumulator<ReturnValue, Value>): ReturnValue
    reduceRight<ReturnValue>(accumulator: Accumulator<ReturnValue, Value>): ReturnValue
    fold<ReturnValue>(
        initialValue: ReturnValue,
        accumulator: Accumulator<ReturnValue, Value>,
    ): ReturnValue
    foldRight<ReturnValue>(
        initialValue: ReturnValue,
        accumulator: Accumulator<ReturnValue, Value>,
    ): ReturnValue
    concat(list: List<Value>): List<Value>

    head(): Option<Value>
    last(): Option<Value>
    tail(): Option<List<Value>>
    init(): Option<List<Value>>

    drop(count: number): List<Value>
    take(count: number): List<Value>
}

export type List<Value> = ListOps<Value>

export const List = <Value>(...items: Value[]): List<Value> => ({
    [Symbol.iterator]: () => items[Symbol.iterator](),

    isEmpty: () => items.length < 1,

    map: mapFn => List(...items.map(mapFn)),
    flatMap: <MappedValue>(mapFn: Func<List<MappedValue>, [value: Value]>) =>
        List(...items.reduce((list, value) => list.concat(mapFn(value)), List<MappedValue>())),
    filter: predicate => List(...items.filter(predicate)),
    reduce: accumulator => items.reduce(accumulator as any) as any,
    reduceRight: accumulator => items.reduceRight(accumulator as any) as any,
    fold: (initialValue, accumulator) => items.reduce(accumulator, initialValue),
    foldRight: (initialValue, accumulator) => items.reduceRight(accumulator, initialValue),
    concat: list => List(...items, ...list),

    head: () => optionOfNullable(items[0]),
    last: () => optionOfNullable(items[items.length - 1]),
    tail: () => (items.length > 0 ? Some(List(...items.slice(1))) : None),
    init: () => (items.length > 0 ? Some(List(...items.slice(0, -1))) : None),

    drop: count => List(...items.slice(count)),
    take: count => List(...items.slice(0, count)),
})
