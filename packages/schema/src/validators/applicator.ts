import type { Validator } from '../validation'
import {
  enterBoth,
  enterKeyword,
  validateValue,
  combineOutputs,
  enterInstance,
  validateVerbose,
  validOutput,
  getEvaluatedProperties,
  invalidOutput,
} from '../validation'
import { isSchema } from '../common'
import { isBoolean, isArray, isObject, isString } from '@talesoft/types'
import { none, some } from '@talesoft/option'

export const applicatorValidators: Record<string, Validator> = {
  // prefixItems
  prefixItems: (schema, value, context) => {
    if (isBoolean(schema) || !isArray(schema.prefixItems) || !isArray(value)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('prefixItems', context)
    const promises = schema.prefixItems.slice(0, value.length).map((itemSchema, index) => {
      const itemContext = enterBoth(index, localContext)
      return validateValue(itemSchema, value[index], itemContext)
    })

    return Promise.all(promises).then(itemOutputs => {
      const failedIndexes = itemOutputs
        .map((result, index) => [result, index] as const)
        .filter(([result]) => !result.valid)
        .map(([, index]) => index)

      return some(
        combineOutputs(
          itemOutputs,
          localContext.error`Prefix child validation failed at indexes ${failedIndexes}`,
          localContext,
        ),
      )
    })
  },

  // items
  items: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.items) || !isArray(value)) {
      return Promise.resolve(none)
    }

    const itemSchema = schema.items
    const localContext = enterKeyword('items', context)
    const promises = value.map((itemValue, index) => {
      const itemContext = enterInstance(index, localContext)
      return validateValue(itemSchema, itemValue, itemContext)
    })

    return Promise.all(promises).then(itemOutputs => {
      const failedIndexes = itemOutputs
        .map((result, index) => [result, index] as const)
        .filter(([result]) => !result.valid)
        .map(([, index]) => index)

      return some(
        combineOutputs(
          itemOutputs,
          localContext.error`Child validation failed at indexes ${failedIndexes}`,
          localContext,
        ),
      )
    })
  },

  // contains
  contains: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.contains) || !isArray(value)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('contains', context)
    const itemSchema = schema.contains
    const promises = value.map((itemValue, index) => {
      const itemContext = enterInstance(index, localContext)
      return validateVerbose(itemSchema, itemValue, itemContext)
    })

    return Promise.all(promises).then(itemResults => {
      const hasValidResults = itemResults.some(result => result.valid)

      return hasValidResults
        ? some(validOutput(itemResults, localContext))
        : some(
            invalidOutput(
              itemResults,
              localContext.error`Some items did not match the "contains" schema`,
              localContext,
            ),
          )
    })
  },

  // additionalProperties
  additionalProperties: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.additionalProperties) || !isObject(value)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('additionalProperties', context)
    const evaluatedProperties = getEvaluatedProperties(schema, value)
    const unevaluatedProperties = Object.keys(value).filter(
      key => !evaluatedProperties.includes(key),
    )
    const itemSchema = schema.additionalProperties
    const promises = unevaluatedProperties.map(key => {
      const itemContext = enterInstance(key, localContext)
      return validateVerbose(itemSchema, value[key], itemContext)
    })

    return Promise.all(promises).then(itemResults =>
      some(
        combineOutputs(
          itemResults,
          localContext.error`Some properties did not match the "additionalProperties" schema`,
          localContext,
        ),
      ),
    )
  },

  // properties
  properties: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.properties) || !isObject(value)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('properties', context)
    const promises = Object.entries(schema.properties).map(([key, schema]) => {
      const keyContext = enterBoth(key, localContext)
      if (!(key in value)) {
        return Promise.resolve(validOutput([], keyContext))
      }
      return validateVerbose(schema, value[key], keyContext)
    })

    return Promise.all(promises).then(keyResults =>
      some(
        combineOutputs(
          keyResults,
          localContext.error`Some properties did not match the "properties" schema`,
          localContext,
        ),
      ),
    )
  },

  // patternProperties
  patternProperties: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.patternProperties) || !isObject(value)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('patternProperties', context)
    const promises = Object.entries(schema.patternProperties).map(([pattern, schema]) => {
      const patternContext = enterKeyword(pattern, localContext)
      const regex = new RegExp(pattern)
      const matchingKeys = Object.keys(value).filter(key => key.match(regex) !== null)
      const promises = matchingKeys.map(key => {
        const keyContext = enterInstance(key, patternContext)
        return validateVerbose(schema, value[key], keyContext)
      })

      return Promise.all(promises).then(keyResults =>
        combineOutputs(
          keyResults,
          localContext.error`Some properties matching the pattern ${pattern} did not match its schema`,
          patternContext,
        ),
      )
    })

    return Promise.all(promises).then(patternResults =>
      some(
        combineOutputs(
          patternResults,
          localContext.error`Some properties did not match the "patternProperties" schemas`,
          localContext,
        ),
      ),
    )
  },

  // dependentSchemas
  dependentSchemas: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.dependentSchemas) || !isObject(value)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('dependentSchemas', context)
    const promises = Object.entries(schema.dependentSchemas).map(([key, schema]) => {
      const keyContext = enterKeyword(key, localContext)
      if (!(key in value)) {
        return Promise.resolve(validOutput([], keyContext))
      }
      return validateVerbose(schema, value, keyContext)
    })

    return Promise.all(promises).then(keyResults =>
      some(
        combineOutputs(
          keyResults,
          localContext.error`Some properties did not match the "dependentSchemas" schemas`,
          localContext,
        ),
      ),
    )
  },

  // propertyNames
  propertyNames: (schema, value, context) => {
    if (isBoolean(schema) || !isString(schema.propertyNames) || !isObject(value)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('propertyNames', context)
    const keySchema = schema.propertyNames
    const promises = Object.keys(value).map(key => {
      const keyContext = enterInstance(key, localContext)
      return validateVerbose(keySchema, key, keyContext)
    })

    return Promise.all(promises).then(keyResults =>
      some(
        combineOutputs(
          keyResults,
          localContext.error`Some keys did not match the "propertyNames" schema`,
          localContext,
        ),
      ),
    )
  },

  // if / then / else
  // It doesn't really make sense to write different validators for these 3
  ifThenElse: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.if)) {
      return Promise.resolve(none)
    }

    const ifContext = enterKeyword('if', context)
    return validateValue(schema.if, value, ifContext).then(ifResult => {
      if (ifResult.valid) {
        if (!isSchema(schema.then)) {
          return some(validOutput([ifResult], ifContext))
        }

        const thenContext = enterKeyword('then', ifContext)
        return validateValue(schema.then, value, thenContext).then(thenResult =>
          thenResult.valid
            ? some(validOutput([thenResult], thenContext))
            : some(
                invalidOutput(
                  [thenResult],
                  context.error`The "then" part of if/then/else did not match"`,
                  thenContext,
                ),
              ),
        )
      }

      if (!isSchema(schema.else)) {
        return some(validOutput([ifResult], ifContext))
      }

      const elseContext = enterKeyword('else', ifContext)
      return validateValue(schema.else, value, elseContext).then(elseResult =>
        elseResult.valid
          ? some(validOutput([elseResult], elseContext))
          : some(
              invalidOutput(
                [elseResult],
                context.error`The "then" part of if/then/else did not match"`,
                elseContext,
              ),
            ),
      )
    })
  },

  // allOf
  allOf: (schema, value, context) => {
    if (isBoolean(schema) || !isArray(schema.allOf)) {
      return Promise.resolve(none)
    }

    const allOf = schema.allOf
    const localContext = enterKeyword('allOf', context)
    const promises = allOf.map((requiredSchema, index) => {
      const schemaContext = enterKeyword(index, localContext)
      return validateValue(requiredSchema, value, schemaContext)
    })

    return Promise.all(promises).then(results => {
      const validCount = results.map(result => result.valid).length

      if (validCount === allOf.length) {
        return some(validOutput(results, localContext))
      }

      return some(
        invalidOutput(
          results,
          localContext.error`The value didn't match some schemas defined in "allOf"`,
          localContext,
        ),
      )
    })
  },

  // anyOf
  anyOf: (schema, value, context) => {
    if (isBoolean(schema) || !isArray(schema.allOf)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('allOf', context)
    const promises = schema.allOf.map((possibleSchema, index) => {
      const schemaContext = enterKeyword(index, localContext)
      return validateValue(possibleSchema, value, schemaContext)
    })
    return Promise.all(promises).then(results => {
      const validCount = results.map(result => result.valid).length

      if (validCount > 0) {
        return some(validOutput([], localContext))
      }

      return some(
        invalidOutput(
          results,
          localContext.error`The value didn't match any schemas defined in "anyOf"`,
          localContext,
        ),
      )
    })
  },

  // oneOf
  oneOf: (schema, value, context) => {
    if (isBoolean(schema) || !isArray(schema.allOf)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('oneOf', context)
    const promises = schema.allOf.map((possibleSchema, index) => {
      const schemaContext = enterKeyword(index, localContext)
      return validateValue(possibleSchema, value, schemaContext)
    })
    return Promise.all(promises).then(results => {
      const validCount = results.map(result => result.valid).length

      if (validCount !== 1) {
        return some(validOutput(results, localContext))
      }

      return some(
        invalidOutput(
          results,
          localContext.error`The value matched none or more than one schemas defined in "oneOf"`,
          localContext,
        ),
      )
    })
  },

  // not
  not: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.not)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('not', context)
    return validateValue(schema.not, value, localContext).then(result =>
      !result.valid
        ? some(validOutput([result], localContext))
        : some(
            invalidOutput(
              [result],
              localContext.error`The value did not match the "not" schema`,
              localContext,
            ),
          ),
    )
  },
}
