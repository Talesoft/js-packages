import { Map } from 'immutable'
import { ValidationState } from '../validation/common'
import type { ValidationError } from 'yup'
import type { FormErrors, Validator } from '../validation/common'
import type { FormOptions, FormImmutableState, FormDispatch } from './common'

export interface ValidationResult<Value extends Record<string, unknown>> {
  readonly value: Value
  readonly validationState: ValidationState
  readonly errors: FormErrors
}

export interface FormStateDispatchers<Value extends Record<string, unknown>> {
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

function isYupValidationError(error: Error): error is ValidationError {
  /* We don't use instanceof to avoid a hard dependency on yup */
  return error.name === 'ValidationError'
}

function createValidator<Value extends Record<string, unknown>>(
  options: FormOptions<Value>,
): Validator<Value> | undefined {
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
              parameters: Map(),
            },
          ],
        }),
        {} as FormErrors,
      )
    }
    return {}
  }
}

export default function createFormDispatchers<Value extends Record<string, unknown>>(
  options: FormOptions<Value>,
  state: FormImmutableState<Value>,
  dispatch: FormDispatch,
): FormStateDispatchers<Value> {
  function getValue(): Value {
    return state.get('value').toJS() as Value
  }
  async function validate(): Promise<ValidationResult<Value>> {
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
  function registerField(path: string): void {
    dispatch({ type: 'registerField', path })
  }
  function unregisterField(path: string): void {
    dispatch({ type: 'unregisterField', path })
  }
  function getFieldValue<Value = unknown>(path: string): Value {
    return state.get('value').getIn(path.split('.'))
  }
  function setFieldValue<Value>(path: string, value: Value): void {
    dispatch({ type: 'setFieldValue', path, value })
  }
  function reset(): void {
    dispatch({ type: 'reset' })
  }
  function beginSubmit(): void {
    dispatch({ type: 'beginSubmit' })
  }
  function finishSubmit(): void {
    dispatch({ type: 'finishSubmit' })
  }
  async function submit(): Promise<void> {
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
