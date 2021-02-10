import type { AsyncAction } from './actions'
import actions from './actions'
import createInitialAsyncState from './createInitialAsyncState'
import reduceAsyncState from './reduceAsyncState'
import type { AsyncState } from './states'

function applyActions<Value, ErrorValue>(
    state: AsyncState<Value, ErrorValue>,
    actions: Array<AsyncAction<Value, ErrorValue>>,
) {
    return actions.reduce((newState, action) => reduceAsyncState(newState, action), state)
}

const initialState = createInitialAsyncState('test')

describe('reduceAsyncState', () => {
    it('should apply reset correctly', () => {
        const resolvedState = applyActions(initialState, [
            actions.beginLoad(),
            actions.resolve('new value'),
            actions.reset(),
        ])
        const rejectedState = applyActions(initialState, [
            actions.beginLoad(),
            actions.reject('test error'),
            actions.reset(),
        ])
        const expectedState = {
            initialValue: 'test',
            loaded: false,
            loading: false,
            value: 'test',
            error: undefined,
        }
        expect(resolvedState).toEqual(expectedState)
        expect(rejectedState).toEqual(expectedState)
    })
    it('should apply beginLoad correctly', () => {
        const loadingState = applyActions(initialState, [actions.beginLoad()])
        const rejectedState = applyActions(initialState, [
            actions.beginLoad(),
            actions.reject('test error'),
            actions.beginLoad(),
        ])
        const resolvedState = applyActions(initialState, [
            actions.beginLoad(),
            actions.resolve('new value'),
            actions.beginLoad(),
        ])
        expect(loadingState).toEqual({
            initialValue: 'test',
            loaded: false,
            loading: true,
            value: 'test',
            error: undefined,
        })
        expect(rejectedState).toEqual({
            initialValue: 'test',
            loaded: true,
            loading: true,
            value: 'test',
            error: undefined,
        })
        expect(resolvedState).toEqual({
            initialValue: 'test',
            loaded: true,
            loading: true,
            value: 'new value',
            error: undefined,
        })
    })
    it('should apply resolve correctly', () => {
        const state = applyActions(initialState, [
            actions.beginLoad(),
            actions.reject('test error'),
            actions.beginLoad(),
            actions.resolve('new value'),
        ])
        expect(state).toEqual({
            initialValue: 'test',
            loaded: true,
            loading: false,
            value: 'new value',
            error: undefined,
        })
    })
    it('should apply reject correctly', () => {
        const state = applyActions(initialState, [
            actions.beginLoad(),
            actions.reject('test error'),
        ])
        expect(state).toEqual({
            initialValue: 'test',
            loaded: true,
            loading: false,
            value: 'test',
            error: 'test error',
        })
    })
})
