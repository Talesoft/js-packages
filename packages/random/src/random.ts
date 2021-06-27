export type RandomNumberGenerator = (seed: number) => { value: number; seed: number }

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
const mulberry32: RandomNumberGenerator = seed => {
  const newSeed = seed + 0x6d2b79f5
  let t = newSeed
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return {
    seed: newSeed,
    value: ((t ^ (t >>> 14)) >>> 0) / 4294967296,
  }
}

type EntropyGenerator = () => number

const generateEntropy: EntropyGenerator = () => {
  // TODO: Improve this a lot
  if (typeof window !== 'undefined' && window.performance) {
    return window.performance.now()
  }
  if (typeof Date !== 'undefined' && Date.now) {
    return Date.now()
  }
  return Math.random() * Number.MAX_VALUE
}

export type RandomResult = {
  readonly seed: number
  readonly value: number
  readonly next: RandomResult
  readonly valueTo: (max: number) => number
  readonly valueBetween: (min: number, max: number) => number
  readonly integerTo: (max: number) => number
  readonly integerBetween: (min: number, max: number) => number
  readonly itemOf: <Value>(items: Value[]) => Value
}

export const createRandom = (initialSeed = generateEntropy()): RandomResult => {
  const { seed, value } = mulberry32(initialSeed)
  return Object.defineProperties(
    { seed, value },
    {
      next: { get: () => createRandom(seed) },
      valueTo: { value: (max: number): number => value * max },
      valueBetween: { value: (min: number, max: number): number => min + value * (max - min) },
      integerTo: { value: (max: number): number => Math.floor(value * max) },
      integerBetween: {
        value: (min: number, max: number): number => Math.floor(min + value * (max - min)),
      },
      itemOf: { value: <Value>(items: Value[]): Value => items[Math.floor(value * items.length)] },
    },
  ) as RandomResult
}
