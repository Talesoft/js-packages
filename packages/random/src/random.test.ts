import { createRandom } from './random'
import each from 'jest-each'

describe('random', () => {
  each([
    [1, 0.6270739405881613],
    [10, 0.5019920116756111],
    [20, 0.7526106622535735],
    [100, 0.2043598669115454],
    [500, 0.2665772803593427],
    [1000, 0.7951949068810791],
    [5000, 0.02629107586108148],
    [50000, 0.05413842527195811],
  ]).it('should, from seed %f, generate %f', (seed, expected) => {
    expect(createRandom(seed).value).toBe(expected)
  })
  each([
    [1, 0.9683778982143849],
    [10, 0.45741763804107904],
    [20, 0.4274260352831334],
    [100, 0.5522557524964213],
    [500, 0.9446613027248532],
    [1000, 0.017807392636314034],
    [5000, 0.04173311730846763],
    [50000, 0.3074705076869577],
  ]).it('should, from seed %f, generate %f after 4 seed-changes', (seed, expected) => {
    expect(createRandom(seed).next.next.next.next.value).toBe(expected)
  })
})
