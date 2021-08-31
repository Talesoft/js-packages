import { Record as ImmutableRecord, Map, fromJS } from 'immutable'
import type { FormFieldImmutableState } from '../fields/common'
import { ValidationState } from '../validation/common'
import type { FormImmutableState } from './common'
import type { FormState } from './common'

const createRecord = ImmutableRecord<FormState<Record<string, unknown>>>({
  initialValue: {},
  value: Map<string, unknown>(),
  submitting: false,
  submitted: false,
  validationState: ValidationState.NOT_VALIDATED,
  fieldStates: Map<string, FormFieldImmutableState>(),
})

const createInitialFormState = <Value extends Record<string, unknown>>(
  initialValue: Value,
): FormImmutableState<Value> =>
  createRecord({
    initialValue,
    value: fromJS(initialValue) as Map<string, unknown>,
  }) as FormImmutableState<Value>
export default createInitialFormState
