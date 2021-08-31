@talesoft/try-catch
=====================

A simple functional wrapper for a try-catch statement.

Makes it easier to handle exceptions immutably.

Usage
=====

```ts
import tryCatch from '@talesoft/try-catch'

function somethingThatCanThrow() {

  if (amIWrong()) {

    throw new Error('I\'m wrong!')
  }

  return 'Some result'
}

const result = tryCatch(somethingThatCanThrow)

// result is of type `string | Error`

const alwaysResult = tryCatch(somethingThatCanThrow, () => 'Other result')

// alwaysResult is of type `string` ('Some result' or 'Other result')

const alwaysResult = tryCatch(somethingThatCanThrow, error => error.message)

// alwaysResult is of type `string` ('Some result' or 'I\'m wrong!')
```
