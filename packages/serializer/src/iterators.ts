export const Done = {
    done: true,
    value: undefined,
} as IteratorResult<never>

export const Next = <Value>(value: Value) =>
    ({
        done: false,
        value,
    } as IteratorResult<Value>)
