export type Clock = () => number

export const now: Clock = globalThis.performance?.now.bind(globalThis.performance) ?? Date.now
