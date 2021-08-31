import type { NodeEditorProps } from '../../common'

const AnyNodeEditor = ({ value, onChange, blocks }: NodeEditorProps): JSX.Element => {
  const matchingBlock = Object.values(blocks).find(block => block.if(value))

  if (!matchingBlock) {
    return <div>[Unknown syntax] {value.kind}</div>
  }

  const Component = matchingBlock.component
  return <Component value={value} onChange={onChange} blocks={blocks} />
}
export default AnyNodeEditor
