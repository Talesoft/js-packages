import type { Map, List, Seq } from 'immutable'

export type FormError<
  Parameters extends FormErrorImmutableParameterMap = FormErrorImmutableParameterMap,
> = {
  readonly message: string
  readonly parameters: Parameters
}

export type FormErrors = Record<string, FormError[]>

export type FormErrorImmutableList = List<FormError>

export type FormErrorImmutableParameterMap = Map<string, Seq<number, unknown>>

export enum ValidationState {
  NOT_VALIDATED = 'notValidated',
  VALID = 'valid',
  INVALID = 'invalid',
}

export type Validator<Value> = (value: Value) => Promise<FormErrors>
