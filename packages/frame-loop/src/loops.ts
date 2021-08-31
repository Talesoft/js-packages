import type { FrameHandler } from './frames'
import { cancelFrame } from './frames'
import { requestFrame } from './frames'

export type FrameLoop = {
  currentFrameId: number
  cancel: () => void
}

export const startLoop = (handler: FrameHandler): FrameLoop => {
  const loop: FrameLoop = {
    currentFrameId: 0,
    cancel: () => cancelFrame(loop.currentFrameId),
  }
  const requestUpdate = () => {
    loop.currentFrameId = requestFrame(onFrame)
  }
  const onFrame: FrameRequestCallback = elapsedTime => {
    requestUpdate()
    handler({ elapsedTime })
  }
  requestUpdate()
  return loop
}
