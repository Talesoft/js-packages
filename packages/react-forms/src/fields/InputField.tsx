import type { DetailedHTMLProps, HTMLProps, InputHTMLAttributes } from 'react'
import useField from './useField'

export type InputProps = HTMLProps<HTMLInputElement>
export type InputValue = string | number | boolean | File | FileList | null

const toScriptValue = (target: HTMLInputElement): InputValue => {
  switch (target.type) {
    case 'file':
      return target.multiple ? target.files : target.files?.[0] ?? null
    case 'checkbox':
      return target.checked
    case 'number':
    case 'range':
      return target.value !== '' ? target.valueAsNumber : null
    case 'time':
    case 'date':
    case 'datetime-local':
      return target.value !== '' ? Math.floor(target.valueAsNumber / 1000) : null
    default:
      return target.value
  }
}

const toFieldValueProps = (
  inputProps: InputProps,
  value: InputValue,
): DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> => {
  switch (inputProps.type) {
    case 'file':
      return {}
    case 'checkbox':
      return { checked: !!value }
    case 'radio':
      return { checked: value === inputProps.value }
    case 'number':
    case 'range':
      return { value: value !== null ? parseInt(value.toString(), 10) : '' }
    case 'time':
      return {
        value: value !== null ? new Date((value as number) * 1000).toISOString().substr(11, 8) : '',
      }
    case 'date':
      return {
        value: value !== null ? new Date((value as number) * 1000).toISOString().substr(0, 10) : '',
      }
    case 'datetime-local':
      return {
        value: value !== null ? new Date((value as number) * 1000).toISOString().substr(0, 19) : '',
      }
    default:
      return { value: value?.toString() ?? '' }
  }
}

const InputField = (props: InputProps): JSX.Element => {
  const { value, setValue } = useField<InputValue>(props.name ?? '')
  const valueProps = toFieldValueProps(props, value)
  return (
    <input {...props} {...valueProps} onChange={event => setValue(toScriptValue(event.target))} />
  )
}

export default InputField
