import { ValidationState } from '../validation/common'
import useFieldErrors from './useFieldErrors'

export interface ErrorMessageProps {
  readonly name: string
}

export default function ErrorMessage({ name }: ErrorMessageProps): JSX.Element {
  const { errors, validationState } = useFieldErrors(name)
  if (validationState !== ValidationState.INVALID || errors.size < 1) {
    return <></>
  }
  return <>{errors.get(0)}</>
}
