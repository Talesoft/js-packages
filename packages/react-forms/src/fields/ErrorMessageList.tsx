import useFieldErrors from './useFieldErrors'
import { ValidationState } from '../validation/common'
import type { HTMLProps } from 'react'

type UlProps = HTMLProps<HTMLUListElement>

export interface ErrorMessageListProps extends UlProps {
  readonly name: string
}

export default function ErrorMessageList({ name, ...ulProps }: ErrorMessageListProps): JSX.Element {
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
