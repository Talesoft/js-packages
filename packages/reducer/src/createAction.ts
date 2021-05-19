import { TypePayloadAction } from './types'

export default function createAction<Type, Payload>(type: Type, payload?: Payload) {
    if (payload === undefined) {
        return { type }
    }
    return { type, payload } as TypePayloadAction<Type, Payload>
}
