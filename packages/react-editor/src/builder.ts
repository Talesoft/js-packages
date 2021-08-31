import type {
  ConciseBody,
  Expression,
  ParameterDeclaration,
  TypeNode,
  TypeParameterDeclaration,
  VariableStatement,
  ArrowFunction,
  Statement,
  Block,
  SourceFile,
} from 'typescript'
import { factory, SyntaxKind, NodeFlags } from 'typescript'

export const code = {
  const: (name: string, value: Expression): VariableStatement =>
    factory.createVariableStatement(
      [],
      factory.createVariableDeclarationList([
        factory.createVariableDeclaration(name, undefined, undefined, value),
      ]),
    ),
  source: (...statements: Statement[]): SourceFile =>
    factory.createSourceFile(
      statements,
      factory.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None,
    ),
  block: (...statements: Statement[]): Block => factory.createBlock(statements),
  fn: (
    typeParameters: TypeParameterDeclaration[],
    parameters: ParameterDeclaration[],
    returnType: TypeNode,
    body: ConciseBody,
  ): ArrowFunction =>
    factory.createArrowFunction(
      [],
      typeParameters,
      parameters,
      returnType,
      factory.createToken(SyntaxKind.EqualsGreaterThanToken),
      body,
    ),
}
