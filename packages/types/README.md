@talesoft/types
================

Minimalistic and strict utility functions for JavaScript's primitive types.

Install
=======

```bash
// Yarn
yarn add @talesoft/types

// NPM
npm i @talesoft/types
```

TypeScript typings are included (No `@types/` package needed)

Usage
=====

#### Predicates for simple type checks

```ts
import {
  isUndefined,
  isNull,
  isNullOrUndefined,
  isBoolean,
  isString,
  isNumber,
  isInteger,
  isNumeric,
  isArray,
  isObject,
  isFunction,
} from '@talesoft/types'

isUndefined('test') // false
isUndefined(undefined) // true
isUndefined(null) // false

isNull('test') // false
isNull(null) // true
isNull(undefined) // false


// etc...
```
