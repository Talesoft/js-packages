@talesoft/ok
============

A small functional wrapper for a tuple of a result and an error (e.g. Either, Result or similar in functional languages).

The API aims to be similar to the JS Promise API and with it represent some kind of "synchronous promise" that is not
bound to the event loop.

Usage
=====

```ts
import { ok, failure } from '@talesoft/ok'

function loadUsers() {

  const users = // ...
  if (users.loaded) {

    return ok(users.list)
  }

  return users.loaded
    ? ok(users.list)
    : failure(new Error('Some describing error'))
}

const users = loadUsers()
  // We can map the value of the result
  .map(users => users.sort(u => u.name))
  // We can transform an ok result to a different result
  .then(users => users.find(u => u.name === 'Tommy') ? ok(users) : failure(new Error('Tommy can\'t be missing!')))
  // We can map the error to a different error
  .mapError(error => new Error(`Failed to find users: ${error.message}`))
  // We can transform a failure result to a different result
  .catch(error => ok([{ name: 'Tommy' }]))
  // We can let JS throw the error and fetch the final result safely
  .orThrow()
```
