import { validateFlag } from '../validation'
import each from 'jest-each'

describe('coreValidators', () => {
  describe('$ref', () => {
    each([
      [
        'simple ref - valid',
        {
          $defs: { test: { type: 'string' } },
          type: 'object',
          properties: { a: { $ref: '#/$defs/test' } },
        },
        [{ a: 'test' }],
        { valid: true },
      ],
      [
        'simple ref - invalid',
        {
          $defs: { test: { type: 'string' } },
          type: 'object',
          properties: { a: { $ref: '#/$defs/test' } },
        },
        [{ a: 123 }],
        { valid: true },
      ],
      [
        'ref with id - valid',
        {
          $id: 'https://example.com/schema.json#',
          $defs: { test: { type: 'string' } },
          type: 'object',
          properties: { a: { $ref: 'https://example.com/schema.json#/$defs/test' } },
        },
        [{ a: 'test' }],
        { valid: true },
      ],
      [
        'ref with id - invalid',
        {
          $id: 'https://example.com/schema.json#',
          $defs: { test: { type: 'string' } },
          type: 'object',
          properties: { a: { $ref: 'https://example.com/schema.json#/$defs/test' } },
        },
        [{ a: 123 }],
        { valid: true },
      ],
    ]).it('should correctly resolve schemas (%s)', (_, schema, values, expected) => {
      values.forEach((value: unknown) => expect(validateFlag(schema, value)).toEqual(expected))
    })
  })
})
