import {
  enterBoth,
  enterKeyword,
  Validator,
  validateValue,
  combineOutputs,
  enterInstance,
  validateVerbose,
  validOutput,
  getEvaluatedProperties,
  invalidOutput,
} from '../validation'
import { isArray, isBoolean, isObject, isSchema, isString } from '../common'

export const applicatorValidators: Record<string, Validator> = {
  // prefixItems
  prefixItems: (schema, value, context) => {
    if (isBoolean(schema) || !isArray(schema.prefixItems) || !isArray(value)) {
      return undefined
    }

    const localContext = enterKeyword('prefixItems', context)
    const itemOutputs = schema.prefixItems.slice(0, value.length).map((itemSchema, index) => {
      const itemContext = enterBoth(index, localContext)
      return validateValue(itemSchema, value[index], itemContext)
    })
    const failedIndexes = itemOutputs
      .map((result, index) => [result, index] as const)
      .filter(([result]) => !result.valid)
      .map(([, index]) => index)

    return combineOutputs(
      itemOutputs,
      localContext.error`Prefix child validation failed at indexes ${failedIndexes}`,
      localContext,
    )
  },

  // items
  items: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.items) || !isArray(value)) {
      return undefined
    }

    const itemSchema = schema.items
    const localContext = enterKeyword('items', context)
    const itemOutputs = value.map((itemValue, index) => {
      const itemContext = enterInstance(index, localContext)
      return validateValue(itemSchema, itemValue, itemContext)
    })
    const failedIndexes = itemOutputs
      .map((result, index) => [result, index] as const)
      .filter(([result]) => !result.valid)
      .map(([, index]) => index)

    return combineOutputs(
      itemOutputs,
      localContext.error`Child validation failed at indexes ${failedIndexes}`,
      localContext,
    )
  },

  // contains
  contains: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.contains) || !isArray(value)) {
      return undefined
    }

    const localContext = enterKeyword('contains', context)
    const itemSchema = schema.contains
    const itemResults = value.map((itemValue, index) => {
      const itemContext = enterInstance(index, localContext)
      return validateVerbose(itemSchema, itemValue, itemContext)
    })
    const hasValidResults = itemResults.some(result => result.valid)

    return hasValidResults
      ? validOutput(itemResults, localContext)
      : invalidOutput(
          itemResults,
          localContext.error`Some items did not match the "contains" schema`,
          localContext,
        )
  },

  // additionalProperties
  additionalProperties: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.additionalProperties) || !isObject(value)) {
      return undefined
    }

    const localContext = enterKeyword('additionalProperties', context)
    const evaluatedProperties = getEvaluatedProperties(schema, value)
    const unevaluatedProperties = Object.keys(value).filter(
      key => !evaluatedProperties.includes(key),
    )
    const itemSchema = schema.additionalProperties
    const itemResults = unevaluatedProperties.map(key => {
      const itemContext = enterInstance(key, localContext)
      return validateVerbose(itemSchema, value[key], itemContext)
    })

    return combineOutputs(
      itemResults,
      localContext.error`Some properties did not match the "additionalProperties" schema`,
      localContext,
    )
  },

  // properties
  properties: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.properties) || !isObject(value)) {
      return undefined
    }

    const localContext = enterKeyword('properties', context)
    const keyResults = Object.entries(schema.properties).map(([key, schema]) => {
      const keyContext = enterBoth(key, localContext)
      if (!(key in value)) {
        return validOutput([], keyContext)
      }
      return validateVerbose(schema, value[key], keyContext)
    })

    return combineOutputs(
      keyResults,
      localContext.error`Some properties did not match the "properties" schema`,
      localContext,
    )
  },

  // patternProperties
  patternProperties: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.patternProperties) || !isObject(value)) {
      return undefined
    }

    const localContext = enterKeyword('patternProperties', context)
    const patternResults = Object.entries(schema.patternProperties).map(([pattern, schema]) => {
      const patternContext = enterKeyword(pattern, localContext)
      const regex = new RegExp(pattern)
      const matchingKeys = Object.keys(value).filter(key => key.match(regex) !== null)
      const keyResults = matchingKeys.map(key => {
        const keyContext = enterInstance(key, patternContext)
        return validateVerbose(schema, value[key], keyContext)
      })
      return combineOutputs(
        keyResults,
        localContext.error`Some properties matching the pattern ${pattern} did not match its schema`,
        patternContext,
      )
    })

    return combineOutputs(
      patternResults,
      localContext.error`Some properties did not match the "patternProperties" schemas`,
      localContext,
    )
  },

  // dependentSchemas
  dependentSchemas: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.dependentSchemas) || !isObject(value)) {
      return undefined
    }

    const localContext = enterKeyword('dependentSchemas', context)
    const keyResults = Object.entries(schema.dependentSchemas).map(([key, schema]) => {
      const keyContext = enterKeyword(key, localContext)
      if (!(key in value)) {
        return validOutput([], keyContext)
      }
      return validateVerbose(schema, value, keyContext)
    })

    return combineOutputs(
      keyResults,
      localContext.error`Some properties did not match the "dependentSchemas" schemas`,
      localContext,
    )
  },

  // propertyNames
  propertyNames: (schema, value, context) => {
    if (isBoolean(schema) || !isString(schema.propertyNames) || !isObject(value)) {
      return undefined
    }

    const localContext = enterKeyword('propertyNames', context)
    const keySchema = schema.propertyNames
    const keyResults = Object.keys(value).map(key => {
      const keyContext = enterInstance(key, localContext)
      return validateVerbose(keySchema, key, keyContext)
    })

    return combineOutputs(
      keyResults,
      localContext.error`Some keys did not match the "propertyNames" schema`,
      localContext,
    )
  },

  // if / then / else
  // It doesn't really make sense to write different validators for these 3
  ifThenElse: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.if)) {
      return undefined
    }

    const ifContext = enterKeyword('if', context)
    const ifResult = validateValue(schema.if, value, ifContext)

    if (ifResult.valid) {
      if (!isSchema(schema.then)) {
        return validOutput([ifResult], ifContext)
      }

      const thenContext = enterKeyword('then', ifContext)
      const thenResult = validateValue(schema.then, value, thenContext)
      return thenResult.valid
        ? validOutput([thenResult], thenContext)
        : invalidOutput(
            [thenResult],
            context.error`The "then" part of if/then/else did not match"`,
            thenContext,
          )
    }

    if (!isSchema(schema.else)) {
      return validOutput([ifResult], ifContext)
    }

    const elseContext = enterKeyword('else', ifContext)
    const elseResult = validateValue(schema.else, value, elseContext)
    return elseResult.valid
      ? validOutput([elseResult], elseContext)
      : invalidOutput(
          [elseResult],
          context.error`The "then" part of if/then/else did not match"`,
          elseContext,
        )
  },

  // allOf
  allOf: (schema, value, context) => {
    if (isBoolean(schema) || !isArray(schema.allOf)) {
      return undefined
    }

    const localContext = enterKeyword('allOf', context)
    const results = schema.allOf.map((requiredSchema, index) => {
      const schemaContext = enterKeyword(index, localContext)
      return validateValue(requiredSchema, value, schemaContext)
    })
    const validCount = results.map(result => result.valid).length

    if (validCount === schema.allOf.length) {
      return validOutput(results, localContext)
    }

    return invalidOutput(
      results,
      localContext.error`The value didn't match some schemas defined in "allOf"`,
      localContext,
    )
  },

  // anyOf
  anyOf: (schema, value, context) => {
    if (isBoolean(schema) || !isArray(schema.allOf)) {
      return undefined
    }

    const localContext = enterKeyword('allOf', context)
    const results = schema.allOf.map((possibleSchema, index) => {
      const schemaContext = enterKeyword(index, localContext)
      return validateValue(possibleSchema, value, schemaContext)
    })
    const validCount = results.map(result => result.valid).length

    if (validCount > 0) {
      return validOutput([], localContext)
    }

    return invalidOutput(
      results,
      localContext.error`The value didn't match any schemas defined in "anyOf"`,
      localContext,
    )
  },

  // oneOf
  oneOf: (schema, value, context) => {
    if (isBoolean(schema) || !isArray(schema.allOf)) {
      return undefined
    }

    const localContext = enterKeyword('oneOf', context)
    const results = schema.allOf.map((possibleSchema, index) => {
      const schemaContext = enterKeyword(index, localContext)
      return validateValue(possibleSchema, value, schemaContext)
    })
    const validCount = results.map(result => result.valid).length

    if (validCount !== 1) {
      return validOutput(results, localContext)
    }

    return invalidOutput(
      results,
      localContext.error`The value matched none or more than one schemas defined in "oneOf"`,
      localContext,
    )
  },

  // not
  not: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.not)) {
      return undefined
    }

    const localContext = enterKeyword('not', context)
    const result = validateValue(schema.not, value, localContext)
    return !result.valid
      ? validOutput([result], localContext)
      : invalidOutput(
          [result],
          localContext.error`The value did not match the "not" schema`,
          localContext,
        )
  },
}
