@talesoft/json-pointer
======================

Utilities for JSON-pointers.

Install
=======

```bash
// Yarn
yarn add @talesoft/json-pointer

// NPM
npm i @talesoft/json-pointer
```

TypeScript typings are included (No `@types/` package needed)

Usage
=====

```ts
import { resolve } from '@talesoft/json-pointer'

const value = resolve('/someProperty/2', { someProperty: ['a', 'b', 'c', 'd']}) // "c"
```
