import type { Node } from 'typescript'

export type NodeEditorProps = {
  value: Node
  onChange: (node: Node) => void
  blocks: BlockList
}

export type NodeEditor = (props: NodeEditorProps) => JSX.Element

export type BlockDefinition = {
  name: string
  if: (node: Node) => boolean
  component: NodeEditor
}

export type BlockList = Record<string, BlockDefinition>
