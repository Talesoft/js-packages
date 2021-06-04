@talesoft/schema
================

A very lightweight implementation of the [JSON-Schema](https://json-schema.org/) standard.

Especially for TypeScript users it provides clean and propery typing for JSON-Schemas.

Usage
=====

Type a schema

```ts
import type { Schema } from '@talesoft/schema'

const user: Schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 5 },
  },
}
```

Build schemas easily with factories

```ts
import { objectOf, string } from '@talesoft/schema'

const user = objectOf({
  email: string({ format: 'email' }),
  password: string({ minLength: 5 }),
})
```

All factories on a glance

```ts
// Primitives
import { schemaNull, boolean, string, number, integer, array, object } from '@talesoft/schema'

const product = object({
  properties: {
    title: string({ minLength: 5 }),
    description: oneOf(string(), schemaNull()),
    price: number({ minimum: 0, maximum: 1000 }),
    stock: integer({ minimum: 0 }),
    tags: array({ items: string() }),
  }
})

```ts
// Composition (https://json-schema.org/understanding-json-schema/reference/combining.html)
import { allOf, anyOf, oneOf, not } from '@talesoft/schema'

allOf(string(), { minLength: 5 }) // { allOf: [{ type: 'string' }, { minLength: 5 }] }
anyOf(string(), number(), schemaNull()) // { anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'null' }]}
```