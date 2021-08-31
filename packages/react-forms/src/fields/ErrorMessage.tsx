import { ValidationState } from '../validation/common'
import useFieldErrors from './useFieldErrors'

export type ErrorMessageProps = {
  readonly name: string
}

const ErrorMessage = ({ name }: ErrorMessageProps): JSX.Element => {
  const { errors, validationState } = useFieldErrors(name)
  if (validationState !== ValidationState.INVALID || errors.size < 1) {
    return <></>
  }
  return <>{errors.get(0)}</>
}
export default ErrorMessage
