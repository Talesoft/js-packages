import each from 'jest-each'
import { none, some } from '@talesoft/option'
import { resolve } from './jsonPointer'

describe('parse', () => {
  each([
    ['', {}, some({})],
    ['', { a: 1 }, some({ a: 1 })],
    ['', null, some(null)],
    ['/', {}, none],
    ['/test', null, none],
    ['/test', {}, none],
    ['/test/a', { test: {} }, none],
    ['/', { a: 1 }, none],
    ['/test', { test: 1 }, some(1)],
    ['/test', { test: undefined }, some(undefined)],
    ['/test/2', { test: [1, 2, undefined, 4] }, some(undefined)],
    ['/test', { test: { a: 1 } }, some({ a: 1 })],
    ['/test/a', { test: { a: 1 } }, some(1)],
    ['/test/2', { test: [1, 2, 3, 4] }, some(3)],
    ['/test/2', { test: [] }, none],
    ['/te~1st/2', { 'te/st': [1, 2, 3, 4] }, some(3)],
    ['/te~0st/2', { 'te~st': [1, 2, 3, 4] }, some(3)],
    ['/te~0~1st/2', { 'te~/st': [1, 2, 3, 4] }, some(3)],
  ]).it('should correctly resolve the pointer %s', (pointer, value, expected) => {
    const result = resolve(pointer, value)
    expect(result).toEqual(expected)
  })
})
