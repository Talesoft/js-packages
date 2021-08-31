import { SyntaxKind } from 'typescript'
import type { NodeEditorProps, BlockList } from '../../common'
import AnyNodeEditor from './AnyNodeEditor'
import VariableDeclarationEditor from './VariableDeclarationEditor'

export const defaultBlocks: BlockList = {
  assignment: {
    name: 'Variable Declaration',
    if: node => node.kind === SyntaxKind.VariableStatement,
    component: VariableDeclarationEditor,
  },
}

export type TypeScriptEditorProps = NodeEditorProps

const TypeScriptEditor = ({
  value,
  onChange,
  blocks = defaultBlocks,
}: TypeScriptEditorProps): JSX.Element => {
  return <AnyNodeEditor value={value} onChange={onChange} blocks={blocks} />
}

export default TypeScriptEditor
