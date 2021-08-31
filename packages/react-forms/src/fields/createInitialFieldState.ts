import type { FieldState, FormFieldImmutableState } from './common'
import { Record, List } from 'immutable'
import { ValidationState } from '../validation/common'

const createRecord = Record({
  errors: List(),
  validationState: ValidationState.NOT_VALIDATED,
  changed: false,
} as Readonly<FieldState>)

export default (): FormFieldImmutableState => createRecord()
