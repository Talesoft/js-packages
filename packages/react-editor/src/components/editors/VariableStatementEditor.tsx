import type { VariableDeclaration } from 'typescript'
import { NodeFlags } from 'typescript'
import { isVariableStatement, factory } from 'typescript'
import type { NodeEditorProps } from '../../common'
import VariableDeclarationEditor from './VariableDeclarationEditor'
import { updateIndex } from '@talesoft/immutable'
import styled from '@emotion/styled'
import { faBox, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DeclarationContainer = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
`

const VariableStatementEditor = ({ value, onChange, blocks }: NodeEditorProps): JSX.Element => {
  if (!isVariableStatement(value)) {
    return <div>Error: Not a VariableStatement</div>
  }
  const changeDeclaration = (index: number, declaration: VariableDeclaration) =>
    onChange(
      factory.updateVariableStatement(
        value,
        declaration.modifiers,
        factory.updateVariableDeclarationList(
          value.declarationList,
          updateIndex(index, () => declaration, Array.from(value.declarationList.declarations)),
        ),
      ),
    )
  const declarations = value.declarationList.declarations
  const mutable = (value.declarationList.flags & NodeFlags.Const) === 0
  const icon = mutable ? faBoxOpen : faBox

  return (
    <DeclarationContainer>
      <FontAwesomeIcon icon={icon} />{' '}
      
      {declarations.map((declaration, index) => (
        <VariableDeclarationEditor
          key={index}
          value={declaration}
          onChange={newDeclaration =>
            changeDeclaration(index, newDeclaration as VariableDeclaration)
          }
          blocks={blocks}
        />
      ))}
    </DeclarationContainer>
  )
}
export default VariableStatementEditor
