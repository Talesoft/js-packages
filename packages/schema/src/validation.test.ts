import { createContext, registerSchema } from './contexts'
import type { Schema } from './standard/meta/schema'
import { validateBasic, validateFlag } from './validation'

describe('validate', () => {
  it('should be able to resolve cross-schema references', () => {
    const crossSchema: Schema = {
      $id: 'https://example.com/schema2.json',
      $defs: {
        aProperty: {
          type: 'string',
        },
      },
    }
    const context = registerSchema(crossSchema, createContext())
    const result = validateFlag(
      {
        $id: 'https://example.com/schema1.json',
        properties: { a: { $ref: 'https://example.com/schema2.json#/$defs/aProperty' } },
      },
      { a: 'test' },
      context,
    )
    expect(result).toEqual({ valid: true })

    const invalidReferenceResult = validateBasic(
      {
        $id: 'https://example.com/schema1.json',
        properties: { a: { $ref: 'https://example.com/schema2.json#/$defs/bProperty' } },
      },
      { a: 'test' },
      context,
    )
    expect(invalidReferenceResult).toEqual({
      valid: false,
      keywordLocation: '',
      instanceLocation: '',
      errors: [
        {
          valid: false,
          keywordLocation: '',
          absoluteKeywordLocation: 'https://example.com/schema1.json#',
          instanceLocation: '',
          error: 'Validation failed',
        },
        {
          valid: false,
          keywordLocation: '/properties',
          absoluteKeywordLocation: 'https://example.com/schema1.json#/properties',
          instanceLocation: '',
          error: 'Some properties did not match the "properties" schema',
        },
        {
          valid: false,
          keywordLocation: '/properties/a',
          absoluteKeywordLocation: 'https://example.com/schema1.json#/properties',
          instanceLocation: '/a',
          error: 'Validation failed',
        },
        {
          valid: false,
          keywordLocation: '/properties/a/$ref',
          absoluteKeywordLocation: 'https://example.com/schema1.json#/properties/$ref',
          instanceLocation: '/a',
          error:
            'Referenced sub-schema of ref "https://example.com/schema2.json#/$defs/bProperty" ("https://example.com/schema2.json#/$defs/bProperty") could not be resolved',
        },
      ],
    })

    const invalidValidationResult = validateBasic(
      {
        $id: 'https://example.com/schema1.json',
        properties: { a: { $ref: 'https://example.com/schema2.json#/$defs/aProperty' } },
      },
      { a: 123 },
      context,
    )
    expect(invalidValidationResult).toEqual({
      valid: false,
      keywordLocation: '',
      instanceLocation: '',
      errors: [
        {
          valid: false,
          keywordLocation: '',
          absoluteKeywordLocation: 'https://example.com/schema1.json#',
          instanceLocation: '',
          error: 'Validation failed',
        },
        {
          valid: false,
          keywordLocation: '/properties',
          absoluteKeywordLocation: 'https://example.com/schema1.json#/properties',
          instanceLocation: '',
          error: 'Some properties did not match the "properties" schema',
        },
        {
          valid: false,
          keywordLocation: '/properties/a',
          absoluteKeywordLocation: 'https://example.com/schema1.json#/properties',
          instanceLocation: '/a',
          error: 'Validation failed',
        },
        {
          valid: false,
          keywordLocation: '/properties/a/$ref',
          absoluteKeywordLocation: 'https://example.com/schema2.json#/$defs/aProperty',
          instanceLocation: '/a',
          error: 'Validation failed',
        },
        {
          valid: false,
          keywordLocation: '/properties/a/$ref/type',
          absoluteKeywordLocation: 'https://example.com/schema2.json#/$defs/aProperty/type',
          instanceLocation: '/a',
          error: 'Type must be one of ["string"], got "number"',
        },
      ],
    })
  })
})
