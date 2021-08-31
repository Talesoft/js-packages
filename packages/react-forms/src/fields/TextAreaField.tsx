import useField from './useField'
import type { HTMLProps } from 'react'

export type TextAreaProps = HTMLProps<HTMLTextAreaElement>

const TextAreaField = (props: TextAreaProps): JSX.Element => {
  const { value, setValue } = useField<string>(props.name ?? '')
  return <textarea {...props} value={value} onChange={event => setValue(event.target.value)} />
}
export default TextAreaField
