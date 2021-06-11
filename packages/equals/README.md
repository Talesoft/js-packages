@talesoft/equals
================

A small function to check for deep, strict and structural equality.

Usage
=====

```ts
import equals from '@talesoft/equals'

equals(1, 2) // false
equals(1, 1) // true

equals({ a: 1 }, { a: 2 }) // false
equals({ a: 1 }, { a: 1 }) // true
```
