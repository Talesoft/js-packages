import type { ComponentRegistry } from './components'

export type Query<Components extends ComponentRegistry> = {
  type: 'byComponentIds'
  componentIds: (keyof Components)[]
}
