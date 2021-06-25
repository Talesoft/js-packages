@talesoft/option
================

A minimal, functional `Option<T>`/`Maybe<T>`-type for JavaScript and TypeScript.

Install
=======

```bash
// Yarn
yarn add @talesoft/option

// NPM
npm i @talesoft/option
```

TypeScript typings are included (No `@types/` package needed)

Usage
=====

```ts
import { ok, failure } from '@talesoft/option'

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
  // We can map the error to a different error
  .mapError(error => new Error(`Failed to find users: ${error.message}`))
  // We can let JS throw the error and fetch the final result safely
  .orUndefined
```
