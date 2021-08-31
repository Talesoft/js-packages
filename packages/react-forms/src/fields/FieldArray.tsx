import type { PropsWithChildren, ReactNode } from 'react'
import type { FieldArrayDispatchers } from './useFieldArray'
import useFieldArray from './useFieldArray'

export type FieldArrayProps<Value> = {
  readonly name: string
  readonly children: (dispatchers: FieldArrayDispatchers<Value>) => ReactNode
}

export type FieldArrayComponent = <Value>(
  props: PropsWithChildren<FieldArrayProps<Value>>,
) => JSX.Element

const FieldArray: FieldArrayComponent = ({ name, children }) => {
  const dispatchers = useFieldArray(name)
  return <>{children(dispatchers)}</>
}

export default FieldArray
