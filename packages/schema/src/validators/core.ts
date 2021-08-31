import type { Validator } from '../validation'
import type { Schema } from '../standard/meta/schema'
import type { ContextTransformer, Context } from '../contexts'
import { setBaseUri } from '../contexts'
import { validateWithContext } from '../validation'
import { dropUriFragment, isAnchor, isRef } from '../common'
import { isBoolean, isString } from '@talesoft/types'
import { parse } from '@talesoft/uri'
import { resolve as resolvePointer } from '@talesoft/json-pointer'
import { resolve as resolveUri } from '@talesoft/uri'
import { enterKeyword } from '../contexts'
import { invalidOutput } from '../outputs'

/**
 * @category Context Transformer Core
 */
export const coreContextTransformers: Record<string, ContextTransformer> = {
  $id: (schema, context) => {
    if (isBoolean(schema) || !isString(schema.$id)) {
      return context
    }
    // Dynamic schema registration during validation
    const newBaseUri = dropUriFragment(resolveUri(context.baseUri, schema.$id))
    return {
      ...context,
      baseUri: newBaseUri,
      schemas: {
        ...context.schemas,
        [newBaseUri]: schema,
      },
    }
  },
  $anchor: (schema, context) => {
    if (!isAnchor(schema)) {
      return context
    }
    const fullUri = resolveUri(context.baseUri, `#${schema.$anchor}`)
    return {
      ...context,
      anchors: {
        ...context.anchors,
        [fullUri]: schema,
      },
    }
  },
}

/**
 * @category Validator Core
 */
export const coreValidators: Record<string, Validator> = {
  // Boolean schema validation (simply, true and false are valid schemas)
  // a "true" schema does not produce any output (It's the same as {}, so no validators kick in and it always stays valid)
  $: (schema, _, context) => {
    if (schema === false) {
      return invalidOutput([], context.error`Must not be any value`, context)
    }

    return null
  },

  $ref: (schema, value, context) => {
    if (!isRef(schema)) {
      return null
    }

    const localContext = enterKeyword('$ref', context)
    const fullUri = resolveUri(localContext.baseUri, schema.$ref)
    // Check if we have an anchor that resolves to this value
    const matchingAnchor = Object.keys(localContext.anchors).find(key => key === fullUri)
    if (matchingAnchor) {
      const anchorSchema = localContext.anchors[matchingAnchor]
      return validateWithContext(anchorSchema, value, localContext)
    }
    const fragment = parse(fullUri).fragment
    const uriWithoutFragment = dropUriFragment(fullUri, fragment)
    // Search for a loaded schema that could contain this ref
    const matchingLoadedSchemaKey = Object.keys(localContext.schemas).find(
      key => key === uriWithoutFragment,
    )
    if (!isString(matchingLoadedSchemaKey)) {
      return invalidOutput(
        [],
        localContext.error`Referenced schema of ref ${
          schema.$ref
        } (${uriWithoutFragment}) was not found.
        Known schemas: ${Object.keys(localContext.schemas)}
        Fragment: ${fragment}
        URI without Fragment: ${uriWithoutFragment}`,
        localContext,
      )
    }

    const crossContext: Context = {
      ...setBaseUri(matchingLoadedSchemaKey, localContext),
      absoluteKeywordLocation: '',
    }
    const loadedSchema = crossContext.schemas[matchingLoadedSchemaKey]
    if (!fragment) {
      return validateWithContext(loadedSchema, value, crossContext)
    }

    if (fragment.startsWith('/')) {
      // This is a JSON-Pointer. We resolve it in the loaded schema
      const resolvedSchema = resolvePointer<Schema>(fragment, loadedSchema)

      if (!resolvedSchema) {
        return invalidOutput(
          [],
          localContext.error`Referenced sub-schema of ref ${schema.$ref} (${fullUri}) could not be resolved`,
          localContext,
        )
      }

      return validateWithContext(resolvedSchema, value, {
        ...crossContext,
        absoluteKeywordLocation: fragment,
      })
    }

    return invalidOutput(
      [],
      localContext.error`Referenced anchor of ref ${schema.$ref} (${fullUri}) could not be resolved`,
      localContext,
    )
  },
}
