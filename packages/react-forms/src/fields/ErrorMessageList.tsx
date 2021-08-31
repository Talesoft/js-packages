import type { HTMLProps } from 'react'
import useFieldErrors from './useFieldErrors'
import { ValidationState } from '../validation/common'

type UlProps = HTMLProps<HTMLUListElement>

export type ErrorMessageListProps = {
  readonly name: string
} & UlProps

const ErrorMessageList = ({ name, ...ulProps }: ErrorMessageListProps): JSX.Element => {
  const { errors, validationState } = useFieldErrors(name)
  if (validationState !== ValidationState.INVALID || errors.size < 1) {
    return <></>
  }
  return (
    <ul {...ulProps}>
      {errors.map((error, key) => (
        <li key={key}>{error.message}</li>
      ))}
    </ul>
  )
}
export default ErrorMessageList
