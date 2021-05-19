import { ChildAction } from './types'

export default function inChild<Key extends PropertyKey, Action>(key: Key, action: Action) {
    return { type: 'reduceChild', payload: { key, action } } as ChildAction<Key, Action>
}
