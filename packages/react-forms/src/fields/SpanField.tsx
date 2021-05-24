import useFormContext from '../forms/useFormContext'
import type { HTMLProps } from 'react'

export type SpanProps = HTMLProps<HTMLSpanElement>

export interface SpanFieldProps extends SpanProps {
  readonly name?: string
}

export default function SpanField({ name, ...spanProps }: SpanFieldProps): JSX.Element {
  const { getFieldValue } = useFormContext()
  return <span {...spanProps}>{getFieldValue(name ?? '')}</span>
}
