import { createImmutable } from './factories'

export const zero = createImmutable(0, 0)
export const one = createImmutable(1, 1)
export const up = createImmutable(0, 1)
export const down = createImmutable(0, -1)
export const left = createImmutable(-1, 0)
export const right = createImmutable(1, 0)
export const infinity = createImmutable(Infinity, Infinity)
export const negativeInfinity = createImmutable(-Infinity, -Infinity)
