import { Func, Functor } from './common'

export interface Option<Value> extends Functor<Value> {
    isDefined(): boolean
    isEmpty(): boolean

    getOrElse(elseValue: Value): Value

    map<MappedValue>(mapFn: Func<MappedValue, [value: Value]>): Option<MappedValue>
    flatMap<MappedValue>(mapFn: Func<Option<MappedValue>, [value: Value]>): Option<MappedValue>
}

export const None: Option<never> = {
    isDefined: () => false,
    isEmpty: () => true,

    getOrElse: <Value>(elseValue: Value) => elseValue,

    map: () => None,
    flatMap: () => None,
}

export const Some = <Value>(value: Value): Option<Value> => ({
    isDefined: () => true,
    isEmpty: () => false,

    getOrElse: () => value,

    map: mapFn => Some(mapFn(value)),
    flatMap: mapFn => mapFn(value),
})

export function optionOfNullable<Value>(value: Value | null | undefined) {
    return value !== null && value !== undefined ? Some(value) : None
}
