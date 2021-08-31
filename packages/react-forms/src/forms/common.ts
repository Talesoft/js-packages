import type { Dispatch } from 'react'
import type { AnySchema } from 'yup'
import type { Record as ImmutableRecord, Map } from 'immutable'
import type { FormFieldImmutableStateMap } from '../fields/common'
import type { FormError, ValidationState, Validator } from '../validation/common'

export type FormState<Value extends Record<string, unknown>> = {
  readonly initialValue: Value
  readonly value: Map<string, unknown>
  readonly submitting: boolean
  readonly submitted: boolean
  readonly validationState: ValidationState
  readonly fieldStates: FormFieldImmutableStateMap
}

export type FormAction =
  | { readonly type: 'reset' }
  | { readonly type: 'beginSubmit' }
  | { readonly type: 'finishSubmit' }
  | { readonly type: 'setFieldValue'; readonly path: string; readonly value: unknown }
  | { readonly type: 'registerField'; readonly path: string }
  | { readonly type: 'unregisterField'; readonly path: string }
  | { readonly type: 'setFieldErrors'; readonly path: string; readonly errors: FormError[] }

export type FormDispatch = Dispatch<FormAction>

export type FormImmutableState<Value extends Record<string, unknown>> = ImmutableRecord<
  FormState<Value>
>

export type SubmitHandler<Value> = (value: Value) => Promise<void> | void

export type FormOptions<Value extends Record<string, unknown>> = {
  readonly initialValue: Value
  readonly onSubmit?: SubmitHandler<Value>
  readonly validate?: Validator<Value>
  readonly validationSchema?: AnySchema
}
