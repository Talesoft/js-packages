import { useReducer, useMemo } from 'react'
import createInitialFormState from './createInitialFormState'
import reduceForm from './reduceForm'
import createFormDispatchers from './createFormDispatchers'
import type { Reducer } from 'react'
import type { FormOptions, FormImmutableState, FormAction } from './common'
import type { FormContextValue } from './FormContext'

export default function useForm<Value extends Record<string, unknown>>(
  options: FormOptions<Value>,
): FormContextValue<Value> {
  const initialFormState = useMemo(() => createInitialFormState(options.initialValue), [
    options.initialValue,
  ])
  const [state, dispatch] = useReducer<Reducer<FormImmutableState<Value>, FormAction>>(
    reduceForm,
    initialFormState,
  )
  const dispatchers = useMemo(() => createFormDispatchers(options, state, dispatch), [
    options,
    state,
    dispatch,
  ])
  return useMemo(
    () => ({
      state,
      ...dispatchers,
    }),
    [state, dispatchers],
  )
}
