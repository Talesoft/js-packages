export type Frame = {
  elapsedTime: number
}

export type FrameHandler = (frame: Frame) => void

export type FrameRequester = (handler: FrameRequestCallback) => number
export type FrameCanceller = (id: number) => void

export const requestFrame: FrameRequester =
  globalThis.requestAnimationFrame ?? ((handler: FrameHandler) => setTimeout(handler, 16.66))

export const cancelFrame: FrameCanceller =
  globalThis.cancelAnimationFrame ?? ((id: number) => clearTimeout(id))
