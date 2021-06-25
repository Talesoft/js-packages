@talesoft/random
================

A minimal, seedable, immutable RNG for JavaScript and TypeScript.

Usage
=====

```ts
import { createRandom } from '@talesoft/random'

const random = createRandom(1337) // Provide a seed

// Retrieve random value in different formats

// Random float number between 0 and 10
console.log(random.valueTo(10))

// Random float number between 10 and 20
console.log(random.valueBetween(10, 20))

// Random integer number between 0 and 20
console.log(random.integerTo(20))

// Random integer number between 0 and 20
console.log(random.integerBetween(20))

// Retrieve a random item from an array
console.log(random.itemOf(['a', 'b', 'c', 'd']))

// Move the RNG
const nextRandom = random.next()

console.log(nextRandom.valueTo(10))

// Create an array of numbers
const { nextRandom, numbers } = Array
  .from({ length: 100 }, () => 0)
  .reduce(
    ({ nextRandom, numbers }) => ({
      numbers: [...numbers, nextRandom.valueBetween(0, 100)],
      nextRandom: nextRandom.next()
    }),
    {
      nextRandom: createRandom(1337),
      numbers: []
    },
  )

// The RNG is immutable, so you _will_ need to keep the correct result in order to continue
// generating proper sequential numbers
```

The API will improve and easen up some tasks in the future for sure.
