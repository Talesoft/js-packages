import type { FormOptions, FormImmutableState } from './common'
import type { FormStateDispatchers } from './createFormDispatchers'
import createInitialFormState from './createInitialFormState'
import { createContext } from 'react'
import createFormDispatchers from './createFormDispatchers'

const initialFormOptions: FormOptions<Record<string, unknown>> = { initialValue: {} }
const initialFormState = createInitialFormState(initialFormOptions.initialValue)

export type FormContextValue<Value extends Record<string, unknown>> = {
  readonly state: FormImmutableState<Value>
} & FormStateDispatchers<Value>

const initialContext: FormContextValue<Record<string, unknown>> = {
  state: initialFormState,
  ...createFormDispatchers(initialFormOptions, initialFormState, () => undefined as void),
}

const FormContext = createContext(initialContext)
export default FormContext
