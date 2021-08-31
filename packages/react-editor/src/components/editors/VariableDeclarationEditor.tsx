import { isVariableDeclaration } from 'typescript'
import type { NodeEditorProps } from '../../common'

const VariableDeclarationEditor = ({ value }: NodeEditorProps): JSX.Element => {
  if (!isVariableDeclaration(value)) {
    return <div>Error: Not a VariableDeclaration</div>
  }
  return <></>
}

export default VariableDeclarationEditor
