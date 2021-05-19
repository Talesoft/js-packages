import type { ChildAction, Reducer, StateOfReducer, ActionOfReducer } from './types'

export default function combineReducers<
    Reducers extends {
        [Key in PropertyKey]: Reducer<any, any>
    }
>(reducers: Reducers) {
    async function reduce<State extends { [Key in keyof Reducers]: StateOfReducer<Reducers[Key]> }>(
        state: State,
        action: {
            [Key in keyof Reducers]: ChildAction<Key, ActionOfReducer<Reducers[Key]>>
        }[keyof Reducers],
    ) {
        const childState = state[action.payload.key]
        const reduceChild = reducers[action.payload.key]
        if (!reduceChild) {
            throw new Error(`Can't reduce child ${action.payload.key}: No child reducer defined.`)
        }
        const newChildState = await reduceChild(childState, action.payload.action)
        if (childState === newChildState) {
            return state
        }
        return {
            ...state,
            [action.payload.key]: newChildState,
        } as State
    }
    return reduce
}
