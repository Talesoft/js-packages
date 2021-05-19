import actions from './actions'

describe('reset', () => {
  it('should return the correct action object', () => {
    expect(actions.reset()).toEqual({ type: 'reset' })
  })
})

describe('beginLoad', () => {
  it('should return the correct action object', () => {
    expect(actions.beginLoad()).toEqual({ type: 'beginLoad' })
  })
})

describe('resolve', () => {
  it('should return the correct action object', () => {
    expect(actions.resolve('test')).toEqual({ type: 'resolve', payload: { value: 'test' } })
  })
})

describe('reject', () => {
  it('should return the correct action object', () => {
    expect(actions.reject('test')).toEqual({ type: 'reject', payload: { error: 'test' } })
  })
})
