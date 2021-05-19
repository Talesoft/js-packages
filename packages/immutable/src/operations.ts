export const operationTypeKey = Symbol('talesoft.immutable.patchOperation')

export interface AddOperation<Value = any> {
    [operationTypeKey]: 'add'
    value: Value
}

export interface RemoveOperation<Value = any> {
    [operationTypeKey]: 'remove'
    value: Value
}

export interface MergeOperation<Value extends Record<PropertyKey, any>> {
    [operationTypeKey]: 'merge'
    value: Value
}
