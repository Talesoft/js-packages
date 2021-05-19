export const valueTypeSymbol = Symbol('valueType')

export enum ValueType {
    RAW = 'raw',
    IDENTIFIER = 'identifier',
    PATH = 'path',
    ESCAPED = 'escaped',
    GENERATED = 'generated',
    COMPUTED = 'computed',
}

export enum ReservedIdentifiers {
    ALL_COLUMNS = '*',
}

export enum Computation {
    COUNT = 'count',
}

export interface RawValue {
    readonly [valueTypeSymbol]: ValueType.RAW
    readonly data: string
}

export interface IdentifierValue {
    readonly [valueTypeSymbol]: ValueType.IDENTIFIER
    readonly name: string
}

export interface PathValue {
    readonly [valueTypeSymbol]: ValueType.PATH
    readonly identifiers: ReadonlyArray<IdentifierValue>
}

export interface EscapedValue {
    readonly [valueTypeSymbol]: ValueType.ESCAPED
    readonly data: number | string
}

export type ValueGenerator = (() => Value | Promise<Value>) | 'autoIncrement'

export interface GeneratedValue {
    readonly [valueTypeSymbol]: ValueType.GENERATED
    readonly generator: ValueGenerator
}

export interface ComputedValue {
    readonly [valueTypeSymbol]: ValueType.COMPUTED
    readonly computation: Computation
    readonly parameters: Value[]
}

export type Value =
    | RawValue
    | IdentifierValue
    | PathValue
    | EscapedValue
    | GeneratedValue
    | ComputedValue

export function isValue(value: any): value is Value {
    return typeof value === 'object' && valueTypeSymbol in value
}

export function isRawValue(value: Value): value is RawValue {
    return value[valueTypeSymbol] === ValueType.RAW
}

export function isIdentifierValue(value: Value): value is IdentifierValue {
    return value[valueTypeSymbol] === ValueType.IDENTIFIER
}

export function isPathValue(value: Value): value is PathValue {
    return value[valueTypeSymbol] === ValueType.PATH
}

export function isEscapedValue(value: Value): value is EscapedValue {
    return value[valueTypeSymbol] === ValueType.ESCAPED
}

export function isGeneratedValue(value: Value): value is GeneratedValue {
    return value[valueTypeSymbol] === ValueType.GENERATED
}

export function isComputedValue(value: Value): value is ComputedValue {
    return value[valueTypeSymbol] === ValueType.GENERATED
}

export function raw(data: string) {
    return { [valueTypeSymbol]: ValueType.RAW, data } as RawValue
}

export function id(name: string) {
    return { [valueTypeSymbol]: ValueType.IDENTIFIER, name } as IdentifierValue
}

export function path(identifiers: ReadonlyArray<IdentifierValue>) {
    return { [valueTypeSymbol]: ValueType.PATH, identifiers } as PathValue
}

export function escaped(data: number | string) {
    return { [valueTypeSymbol]: ValueType.ESCAPED, data } as EscapedValue
}

export function generated(generator: ValueGenerator) {
    return { [valueTypeSymbol]: ValueType.GENERATED, generator } as GeneratedValue
}

export function computed(computation: Computation, parameters: Value[]) {
    return { [valueTypeSymbol]: ValueType.COMPUTED, computation, parameters } as ComputedValue
}

export function allColumns() {
    return id(ReservedIdentifiers.ALL_COLUMNS)
}

export function computedCount(parameters: Value[]) {
    return computed(Computation.COUNT, parameters)
}
