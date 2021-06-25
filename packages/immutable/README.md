@talesoft/immutable
===================

A bunch of useful functions and utilities to work with immutable data structures

Install
=======

```bash
// Yarn
yarn add @talesoft/immutable

// NPM
npm i @talesoft/immutable
```

TypeScript typings are included (No `@types/` package needed)

Usage
=====

Array manipulation

```ts
import { updateIndex } from '@talesoft/immutable'
const numbers = updateIndex(2, n => n * 2, [1, 2, 3, 4, 5]) // [1, 2, 6, 4, 6]

import { push } from '@talesoft/immutable'
const numbers = push(5, [1, 2, 3, 4]) // [1, 2, 3, 4, 5]

import { unshift } from '@talesoft/immutable'
const numbers = unshift(1, [2, 3, 4, 5]) // [1, 2, 3, 4, 5]
```

Object manipulation

```ts
import { setKey } from '@talesoft/immutable'
const numbers = setKey('c', 3, { a: 1, b: 2 }) // { a: 1, b: 2, c: 3 }

import { updateKey } from '@talesoft/immutable'
const numbers = updateKey('c', n => n * 2, { a: 1, b: 2, c: 3 }) // { a: 1, b: 2, c: 6 }

import { removeKey } from '@talesoft/immutable'
const numbers = removeKey('c', { a: 1, b: 2, c: 3 }) // { a: 1, b: 2 }
```
