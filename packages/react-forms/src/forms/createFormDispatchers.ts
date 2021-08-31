import type { ValidationError } from 'yup'
import type { FormErrors, Validator } from '../validation/common'
import type { FormOptions, FormImmutableState, FormDispatch } from './common'
import type { Seq } from 'immutable'
import { Map } from 'immutable'
import { ValidationState } from '../validation/common'

export type ValidationResult<Value extends Record<string, unknown>> = {
  readonly value: Value
  readonly validationState: ValidationState
  readonly errors: FormErrors
}

export type FormStateDispatchers<Value extends Record<string, unknown>> = {
  readonly validate: () => Promise<ValidationResult<Value>>
  readonly registerField: (path: string) => void
  readonly unregisterField: (path: string) => void
  readonly getFieldValue: <FieldValue = unknown>(path: string) => FieldValue
  readonly setFieldValue: <FieldValue>(path: string, value: FieldValue) => void
  readonly reset: () => void
  readonly beginSubmit: () => void
  readonly finishSubmit: () => void
  readonly submit: () => Promise<void>
}

const isYupValidationError = (error: unknown): error is ValidationError =>
  error instanceof Error && error.name === 'ValidationError'

const createValidator = <Value extends Record<string, unknown>>(
  options: FormOptions<Value>,
): Validator<Value> | undefined => {
  if (options.validate) {
    return options.validate
  }

  const schema = options.validationSchema
  if (!schema) {
    return undefined
  }

  return async (value: Value) => {
    try {
      await schema.validate(value, { abortEarly: false, recursive: true })
    } catch (err) {
      // Avoid hard dependency on yup
      if (!isYupValidationError(err)) {
        throw err
      }
      // This is a yup error, extract the info and convert to own error layout
      return err.inner.reduce(
        (errors, error) => ({
          ...errors,
          [error.path ?? '']: [
            ...(errors[error.path ?? ''] ?? []),
            {
              message: error.message,
              parameters: Map<string, Seq<number, unknown>>(),
            },
          ],
        }),
        {} as FormErrors,
      )
    }
    return {}
  }
}

const createFormDispatchers = <Value extends Record<string, unknown>>(
  options: FormOptions<Value>,
  state: FormImmutableState<Value>,
  dispatch: FormDispatch,
): FormStateDispatchers<Value> => {
  const getValue = () => state.get('value').toJS() as Value
  const validate = async () => {
    const value = getValue()
    const validateValue = createValidator(options)
    if (!validateValue) {
      return { value, validationState: ValidationState.VALID, errors: {} }
    }
    const errors = await validateValue(value)
    const entries = Object.entries(errors)
    entries.forEach(([path, errors]) => dispatch({ type: 'setFieldErrors', path, errors }))
    const validationState = entries.length > 0 ? ValidationState.INVALID : ValidationState.VALID
    return { value, validationState, errors }
  }
  const registerField = (path: string) => {
    dispatch({ type: 'registerField', path })
  }
  const unregisterField = (path: string) => {
    dispatch({ type: 'unregisterField', path })
  }
  const getFieldValue = <Value>(path: string): Value =>
    state.get('value').getIn(path.split('.')) as Value
  const setFieldValue = <Value>(path: string, value: Value) => {
    dispatch({ type: 'setFieldValue', path, value })
  }
  const reset = () => {
    dispatch({ type: 'reset' })
  }
  const beginSubmit = () => {
    dispatch({ type: 'beginSubmit' })
  }
  const finishSubmit = () => {
    dispatch({ type: 'finishSubmit' })
  }
  const submit = async () => {
    beginSubmit()
    const { value, validationState } = await validate()
    if (validationState === ValidationState.VALID) {
      await options.onSubmit?.(value)
    }
    finishSubmit()
  }
  return {
    validate,
    registerField,
    unregisterField,
    getFieldValue,
    setFieldValue,
    reset,
    beginSubmit,
    finishSubmit,
    submit,
  }
}

export default createFormDispatchers
