import type { HTMLProps } from 'react'
import useFormContext from '../forms/useFormContext'

export type SpanProps = HTMLProps<HTMLSpanElement>

export type SpanFieldProps = {
  readonly name?: string
} & SpanProps

const SpanField = ({ name, ...spanProps }: SpanFieldProps): JSX.Element => {
  const { getFieldValue } = useFormContext()
  return <span {...spanProps}>{getFieldValue(name ?? '')}</span>
}

export default SpanField
