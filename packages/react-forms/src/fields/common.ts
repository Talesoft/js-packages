import type { FormErrorImmutableList, ValidationState } from '../validation/common'
import type { Record, Map } from 'immutable'

export type FieldState = {
  readonly errors: FormErrorImmutableList
  readonly validationState: ValidationState
  readonly changed: boolean
}

export type FormFieldImmutableState = Record<FieldState>

export type FormFieldImmutableStateMap = Map<string, FormFieldImmutableState>
