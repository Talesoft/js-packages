// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
export interface PrimitiveObject extends Record<string, Primitive> {}
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
export interface PrimitiveArray extends Array<Primitive> {}
export type Primitive = string | boolean | number | null | PrimitiveArray | PrimitiveObject

export type ComponentData = PrimitiveObject
export type Component<Data extends ComponentData> = {
  data: Data
  changedProperties: (keyof Data)[]
  update: () => void
}

export type ComponentDataOf<ComponentType> = ComponentType extends Component<infer Data>
  ? Data
  : unknown

export type ComponentRegistry = Record<string, Component<ComponentData>>
export type ComponentOptions<Components extends ComponentRegistry> = {
  [Key in keyof Components]?: Partial<Components[Key]['data']>
}
