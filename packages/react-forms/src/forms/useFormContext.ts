import type { FormContextValue } from './FormContext'
import { useContext } from 'react'
import FormContext from './FormContext'

export default <Value extends Record<string, unknown>>(): FormContextValue<Value> =>
  useContext(FormContext) as FormContextValue<Value>
