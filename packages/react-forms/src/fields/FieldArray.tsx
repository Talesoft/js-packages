import useFieldArray from './useFieldArray'
import type { PropsWithChildren, ReactNode } from 'react'
import type { FieldArrayDispatchers } from './useFieldArray'

export interface FieldArrayProps<Value> {
  readonly name: string
  readonly children: (dispatchers: FieldArrayDispatchers<Value>) => ReactNode
}

export default function FieldArray<Value extends Record<string, unknown>>({
  name,
  children,
}: PropsWithChildren<FieldArrayProps<Value>>): JSX.Element {
  const dispatchers = useFieldArray(name)
  return <>{children(dispatchers)}</>
}
