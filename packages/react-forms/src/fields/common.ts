import type { FormErrorImmutableList, ValidationState } from '../validation/common'
import type { Record, Map } from 'immutable'

export interface FieldState {
  readonly errors: FormErrorImmutableList
  readonly validationState: ValidationState
  readonly changed: boolean
}

export type FormFieldImmutableState = Record<FieldState>

export type FormFieldImmutableStateMap = Map<string, FormFieldImmutableState>
