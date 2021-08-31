import type { Frame } from '@talesoft/frame-loop'

export type StageResolution =
  | { type: 'fixed'; width: number; height: number }
  | { type: 'screen' }
  | { type: 'auto' }

export type StageProps = {
  resolution?: StageResolution
  fill?: boolean
}

export const Stage = (): JSX.Element => {
  return <canvas />
}
