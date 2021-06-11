import type { Validator } from '../validation'
import {
  enterBoth,
  enterKeyword,
  validateValue,
  combineOutputs,
  enterInstance,
  validOutput,
  getEvaluatedProperties,
  getEvaluatedLength,
} from '../validation'
import { isSchema } from '../common'
import { isBoolean, isArray, isObject } from '@talesoft/types'
import { none, some } from '@talesoft/option'

export const unevaluatedApplicators: Record<string, Validator> = {
  // unevaluatedItems
  unevaluatedItems: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.unevaluatedItems) || !isArray(value)) {
      return Promise.resolve(none)
    }

    const localContext = enterKeyword('unevaluatedItems', context)
    const evaluatedLength = getEvaluatedLength(schema, value)

    if (evaluatedLength >= value.length) {
      return Promise.resolve(some(validOutput([], localContext)))
    }

    const itemSchema = schema.unevaluatedItems
    const promises = value.slice(evaluatedLength).map((itemValue, index) => {
      const itemContext = enterBoth(evaluatedLength + index, localContext)
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
          localContext.error`Unevaluated item validation failed at indexes ${failedIndexes}`,
          localContext,
        ),
      )
    })
  },

  // unevaluatedProperties
  unevaluatedProperties: (schema, value, context) => {
    if (isBoolean(schema) || !isSchema(schema.unevaluatedProperties) || !isObject(value)) {
      return Promise.resolve(none)
    }

    const itemSchema = schema.unevaluatedProperties
    const localContext = enterKeyword('unevaluatedProperties', context)
    const evaluatedProperties = getEvaluatedProperties(schema, value)
    const unevaluatedProperties = Object.keys(value).filter(
      key => !evaluatedProperties.includes(key),
    )

    const promises = unevaluatedProperties.map(key => {
      const itemContext = enterInstance(key, localContext)
      return validateValue(itemSchema, value[key], itemContext)
    })

    return Promise.all(promises).then(keyOutputs =>
      some(
        combineOutputs(
          keyOutputs,
          localContext.error`Unevaluated property validation failed`,
          localContext,
        ),
      ),
    )
  },
}
