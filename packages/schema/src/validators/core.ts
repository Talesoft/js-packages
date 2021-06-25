import type { ContextTransformer, Validator } from '../validation'
import { validateWithContext } from '../validation'
import { enterKeyword } from '../validation'
import { invalidOutput } from '../validation'
import { isAnchor, isDynamicAnchor, isRecursiveAnchor, isRef, isSchema } from '../common'
import { isBoolean, isString } from '@talesoft/types'
import { none, some } from '@talesoft/option'
import { parse } from '@talesoft/uri'
import { resolve } from '@talesoft/json-pointer'

export const coreContextTransformers: Record<string, ContextTransformer> = {
  $id: (schema, context) => {
    if (isBoolean(schema) || !isString(schema.$id)) {
      return context
    }
    return {
      ...context,
      currentSchemaId: schema.$id,
      loadedSchemas: {
        ...context.loadedSchemas,
        [schema.$id]: schema,
      },
    }
  },
  $anchor: (schema, context) => {
    if (!isAnchor(schema)) {
      return context
    }
    return {
      ...context,
      anchors: {
        ...context.anchors,
        [`${context.currentSchemaId}/${schema.$anchor}`]: schema,
      },
    }
  },
  $dynamicAnchor: (schema, context) => {
    if (!isRecursiveAnchor(schema) && !isDynamicAnchor(schema)) {
      return context
    }
    const dynamicAnchor = isRecursiveAnchor(schema)
      ? schema.$recursiveAnchor
      : schema.$dynamicAnchor
    return {
      ...context,
      dynamicAnchors: {
        ...context.dynamicAnchors,
        [`${context.currentSchemaId}/${dynamicAnchor}`]: schema,
      },
    }
  },
}

export const coreValidators: Record<string, Validator> = {
  // Boolean schema validation (simply, true and false are valid schemas)
  // a "true" schema does not produce any output (It's the same as {}, so no validators kick in and it always stays valid)
  $: (schema, _, context) => {
    if (schema === false) {
      return Promise.resolve(some(invalidOutput([], context.error`Must not be any value`, context)))
    }

    return Promise.resolve(none)
  },

  $ref: (schema, value, context) => {
    if (!isRef(schema)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('$ref', context)
    const referencedSchemaId = schema.$ref.startsWith('#')
      ? context.currentSchemaId
      : Object.keys(context.loadedSchemas).find(id => schema.$ref.startsWith(id))
    if (!referencedSchemaId || !context.loadedSchemas[referencedSchemaId]) {
      // TODO: Try network resolve
      return Promise.resolve(
        some(
          invalidOutput(
            [],
            localContext.error`Referenced schema of ref ${schema.$ref} was not found`,
            localContext,
          ),
        ),
      )
    }

    const [fragment] = parse(schema.$ref).asArray.flatMap(({ fragment }) => fragment.asArray)

    if (!fragment.startsWith('/')) {
      // This is an anchor (hopefully defined through $anchor)
    }

    const resolvedSchema = resolve(fragment, context.loadedSchemas[referencedSchemaId]).orUndefined

    if (!isSchema(resolvedSchema)) {
      return Promise.resolve(
        some(
          invalidOutput(
            [],
            localContext.error`Value referenced at ${schema.$ref} is not a valid schema`,
            localContext,
          ),
        ),
      )
    }

    return validateWithContext(resolvedSchema, value, localContext).then(some)
  },

  $anchor: (schema, value, context) => {
    // Notice for us, anchors all work the same as we're always resolving at runtime (right now)
    if (isAnchor(schema)) {
      const localContext = enterKeyword('$anchor', context)
      return Promise.resolve(none)
    }

    const referencedSchemaId = schema.$ref.startsWith('#')
      ? context.currentSchemaId
      : Object.keys(context.loadedSchemas).find(id => schema.$ref.startsWith(id))
    if (!referencedSchemaId || !context.loadedSchemas[referencedSchemaId]) {
      // TODO: Try network resolve
      return Promise.resolve(
        some(
          invalidOutput(
            [],
            localContext.error`Referenced schema of ref ${schema.$ref} was not found`,
            localContext,
          ),
        ),
      )
    }

    const [fragment] = parse(schema.$ref).asArray.flatMap(({ fragment }) => fragment.asArray)
    const resolvedSchema = resolve(fragment, context.loadedSchemas[referencedSchemaId]).orUndefined

    if (!isSchema(resolvedSchema)) {
      return Promise.resolve(
        some(
          invalidOutput(
            [],
            localContext.error`Value referenced at ${schema.$ref} is not a valid schema`,
            localContext,
          ),
        ),
      )
    }

    return validateWithContext(resolvedSchema, value, localContext).then(some)
  },
}
