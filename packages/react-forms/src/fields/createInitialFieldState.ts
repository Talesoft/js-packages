import { Record, List } from 'immutable'
import { ValidationState } from '../validation/common'
import type { FieldState, FormFieldImmutableState } from './common'

const createRecord = Record({
  errors: List(),
  validationState: ValidationState.NOT_VALIDATED,
  changed: false,
} as Readonly<FieldState>)

export default function createInitialFieldState(): FormFieldImmutableState {
  return createRecord()
}
