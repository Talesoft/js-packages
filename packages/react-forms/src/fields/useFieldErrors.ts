import { List } from 'immutable'
import useFormContext from '../forms/useFormContext'
import type { FormErrorImmutableList } from '../validation/common'
import { ValidationState } from '../validation/common'

export interface UseFieldErrorsResult {
  readonly errors: FormErrorImmutableList
  readonly validationState: ValidationState
}

export default function useFieldErrors(name: string): UseFieldErrorsResult {
  const { state } = useFormContext()
  const fieldState = state.getIn(['fieldStates', name])
  const validationState = (fieldState?.get('validationState') ??
    ValidationState.NOT_VALIDATED) as ValidationState
  const errors = (fieldState?.get('errors') ?? List()) as FormErrorImmutableList
  return { errors, validationState }
}
