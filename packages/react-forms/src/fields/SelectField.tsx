import useField from './useField'
import type { HTMLProps } from 'react'

export type SelectProps = HTMLProps<HTMLSelectElement>

export default function SelectField(props: SelectProps): JSX.Element {
  const { value, setValue } = useField<string | string[]>(props.name ?? '')
  return (
    <select
      {...props}
      value={value}
      onChange={event =>
        setValue(
          props.multiple
            ? Array.from(event.target.options)
                .filter(opt => opt.selected)
                .map(opt => opt.value)
            : event.target.value,
        )
      }
    />
  )
}
