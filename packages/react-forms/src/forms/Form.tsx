import type { FormOptions } from './common'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import useForm from './useForm'
import FormContext from './FormContext'

export type FormProps<Value extends Record<string, unknown>> = FormOptions<Value>

/**
 * A container that provides the form context.
 *
 * It has to surround every single form.
 *
 * Form contexts _can_ be nested, but you won't be able to access the parent
 * context unless you forward it via props or another context.
 *
 * @param the parameters of this form
 * @returns a react element
 */
const Form = <Value extends Record<string, unknown>>({
  initialValue,
  onSubmit,
  validate,
  validationSchema,
  children,
}: PropsWithChildren<FormProps<Value>>): JSX.Element => {
  const options = useMemo(
    () => ({ initialValue, onSubmit, validate, validationSchema }),
    [initialValue, onSubmit, validate, validationSchema],
  )
  const form = useForm(options as FormOptions<Record<string, unknown>>)
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>
}

export default Form
