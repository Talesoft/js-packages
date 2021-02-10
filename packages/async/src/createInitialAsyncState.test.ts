import createInitialAsyncState from './createInitialAsyncState'

describe('createInitialAsyncState', () => {
    it('should return the correct state object', () => {
        expect(createInitialAsyncState('test')).toEqual({
            initialValue: 'test',
            loaded: false,
            loading: false,
            value: 'test',
            error: undefined,
        })
    })
})
