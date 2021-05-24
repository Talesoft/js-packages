import createInitialFormState from './createInitialFormState'
import { createContext } from 'react'
import createFormDispatchers from './createFormDispatchers'
import type { FormOptions, FormImmutableState } from './common'
import type { FormStateDispatchers } from './createFormDispatchers'

const initialFormOptions: FormOptions<Record<string, unknown>> = { initialValue: {} }
const initialFormState = createInitialFormState(initialFormOptions.initialValue)

export interface FormContextValue<Value extends Record<string, unknown>>
  extends FormStateDispatchers<Value> {
  readonly state: FormImmutableState<Value>
}

const initialContext: FormContextValue<Record<string, unknown>> = {
  state: initialFormState,
  ...createFormDispatchers(initialFormOptions, initialFormState, () => undefined as void),
}

const FormContext = createContext(initialContext)
export default FormContext
