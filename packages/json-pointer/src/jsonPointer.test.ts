import each from 'jest-each'
import { resolve } from './jsonPointer'

describe('parse', () => {
  each([
    ['', {}, {}],
    ['', { a: 1 }, { a: 1 }],
    ['', null, null],
    ['/', {}, null],
    ['/test', null, null],
    ['/test', {}, null],
    ['/test/a', { test: {} }, null],
    ['/', { a: 1 }, null],
    ['/test', { test: 1 }, 1],
    ['/test', { test: undefined }, undefined],
    ['/test/2', { test: [1, 2, undefined, 4] }, undefined],
    ['/test', { test: { a: 1 } }, { a: 1 }],
    ['/test/a', { test: { a: 1 } }, 1],
    ['/test/2', { test: [1, 2, 3, 4] }, 3],
    ['/test/2', { test: [] }, null],
    ['/te~1st/2', { 'te/st': [1, 2, 3, 4] }, 3],
    ['/te~0st/2', { 'te~st': [1, 2, 3, 4] }, 3],
    ['/te~0~1st/2', { 'te~/st': [1, 2, 3, 4] }, 3],
  ]).it('should correctly resolve the pointer %s', (pointer, value, expected) => {
    const result = resolve(pointer, value)
    expect(result).toEqual(expected)
  })
})
