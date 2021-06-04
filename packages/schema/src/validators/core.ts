import { ContextTransformer, enterKeyword, validateValue, Validator } from '../validation'
import { invalidOutput } from '../validation'
import {
  isAnchor,
  isBoolean,
  isDynamicAnchor,
  isRecursiveAnchor,
  isRef,
  isSchema,
  isString,
} from '../common'
import { resolvePath } from '../paths'

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
      return invalidOutput([], context.error`Must not be any value`, context)
    }

    return undefined
  },

  $ref: (schema, value, context) => {
    if (!isRef(schema)) {
      return undefined
    }

    const localContext = enterKeyword('$ref', context)
    const referencedSchemaId = schema.$ref.startsWith('#')
      ? context.currentSchemaId
      : Object.keys(context.loadedSchemas).find(id => schema.$ref.startsWith(id))
    if (!referencedSchemaId || !context.loadedSchemas[referencedSchemaId]) {
      return invalidOutput(
        [],
        localContext.error`Referenced schema of ref ${schema.$ref} was not found`,
        localContext,
      )
    }

    const path = schema.$ref.substr(
      referencedSchemaId.startsWith('#') ? 1 : referencedSchemaId.length,
    )
    const { path: resolvedPath, value: resolvedSchema } = resolvePath(
      path,
      context.loadedSchemas[referencedSchemaId],
    )

    if (!isSchema(resolvedSchema)) {
      return invalidOutput(
        [],
        localContext.error`Failed to resolved schema path ${resolvedPath} in schema ${referencedSchemaId}`,
        localContext,
      )
    }
    return validateValue(resolvedSchema, value, localContext)
  },
}
