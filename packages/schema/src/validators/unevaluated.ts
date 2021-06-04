import {
  enterBoth,
  enterKeyword,
  Validator,
  validateValue,
  combineOutputs,
  enterInstance,
  validOutput,
  getEvaluatedProperties,
  getEvaluatedLength,
} from '../validation'
import { isArray, isBoolean, isObject, isSchema } from '../common'

export const unevaluatedApplicators: Record<string, Validator> = {
  // unevaluatedItems
  unevaluatedItems: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.unevaluatedItems) || !isArray(value)) {
      return undefined
    }

    const localContext = enterKeyword('unevaluatedItems', context)
    const evaluatedLength = getEvaluatedLength(schema, value)

    if (evaluatedLength >= value.length) {
      return validOutput([], localContext)
    }

    const itemSchema = schema.unevaluatedItems
    const itemOutputs = value.slice(evaluatedLength).map((itemValue, index) => {
      const itemContext = enterBoth(evaluatedLength + index, localContext)
      return validateValue(itemSchema, itemValue, itemContext)
    })
    const failedIndexes = itemOutputs
      .map((result, index) => [result, index] as const)
      .filter(([result]) => !result.valid)
      .map(([, index]) => index)

    return combineOutputs(
      itemOutputs,
      localContext.error`Unevaluated item validation failed at indexes ${failedIndexes}`,
      localContext,
    )
  },

  // unevaluatedProperties
  unevaluatedProperties: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.unevaluatedProperties) || !isObject(value)) {
      return undefined
    }

    const itemSchema = schema.unevaluatedProperties
    const localContext = enterKeyword('unevaluatedProperties', context)
    const evaluatedProperties = getEvaluatedProperties(schema, value)
    const unevaluatedProperties = Object.keys(value).filter(
      key => !evaluatedProperties.includes(key),
    )

    const keyOutputs = unevaluatedProperties.map(key => {
      const itemContext = enterInstance(key, localContext)
      return validateValue(itemSchema, value[key], itemContext)
    })

    return combineOutputs(
      keyOutputs,
      localContext.error`Unevaluated property validation failed`,
      localContext,
    )
  },
}
