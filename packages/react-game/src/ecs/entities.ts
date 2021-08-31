import type { ComponentOptions, ComponentRegistry } from './components'

export type Entity = number

export type EntityManager<Components extends ComponentRegistry> = {
  createEntity: (options: ComponentOptions<Components>) => Entity
  getComponent: <ComponentId extends keyof Components>(
    entity: Entity,
    componentId: ComponentId,
  ) => Components[ComponentId]
  query: (componentIds: string[]) => void
}
