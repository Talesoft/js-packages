import { useContext } from 'react'
import FormContext, { FormContextValue } from './FormContext'

export default function useFormContext<
  Value extends Record<string, unknown>
>(): FormContextValue<Value> {
  return useContext(FormContext) as FormContextValue<Value>
}
