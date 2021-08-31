import type { PropsWithChildren, FormEvent, HTMLAttributes } from 'react'
import { useCallback } from 'react'
import useFormContext from './useFormContext'

export type FormProps = HTMLAttributes<HTMLFormElement>

const FormElement = ({ children, ...formProps }: PropsWithChildren<FormProps>): JSX.Element => {
  const { submit, reset } = useFormContext()
  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      submit()
    },
    [submit],
  )
  const onReset = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      reset()
    },
    [reset],
  )
  return (
    <form noValidate onSubmit={onSubmit} onReset={onReset} {...formProps}>
      {children}
    </form>
  )
}
export default FormElement
