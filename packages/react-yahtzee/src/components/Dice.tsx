import type { DiceValue } from '../yahtzee'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { createRandom } from '../../../random/esm'

export const faceLocations = ['front', 'right', 'back', 'left', 'top', 'bottom'] as const

type FaceLocation = typeof faceLocations[number]

const valueLocationMap: Record<DiceValue, FaceLocation> = {
  1: 'front',
  2: 'bottom',
  3: 'right',
  4: 'top',
  5: 'left',
  6: 'back',
}

const faceRotationMap: Record<FaceLocation, string> = {
  front: 'rotateY(0deg)',
  right: 'rotateY(90deg)',
  back: 'rotateY(180deg) ',
  left: 'rotateY(-90deg)',
  top: 'rotateX(90deg)',
  bottom: 'rotateX(-90deg)',
}

const diceRotationMap: Record<FaceLocation, string> = {
  front: 'rotateY(0deg)',
  right: 'rotateY(-90deg)',
  back: 'rotateY(-180deg)',
  left: 'rotateY(90deg)',
  top: 'rotateX(-90deg)',
  bottom: 'rotateX(90deg)',
}

export type DiceFaceProps = {
  size: number
  location: FaceLocation
}

export const DiceFace = styled.div<DiceFaceProps>(
  ({ size, location }) => `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background-color: rgba(254, 235, 193, .4);
    border: 2px solid rgba(234, 211, 170, 1);
    transform: ${faceRotationMap[location]} translateZ(${size / 2}px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${size * 0.8}px;
    border-radius: 5%;
  `,
)

export type DiceContainerProps = {
  size: number
  value: DiceValue
  rolling?: boolean
}

export const DiceContainer = styled.div<DiceContainerProps>(
  ({ size, value }) => `
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform .05s linear;
    transform: translateZ(-${size / 2}px) ${diceRotationMap[valueLocationMap[value]]};
  `,
)

export type DiceViewportProps = {
  size: number
}

export const DiceViewport = styled.div<DiceViewportProps>(
  ({ size }) => `
    width: ${size}px;
    height: ${size}px;
    perspective: 1000px;
  `,
)

export type DiceProps = {
  readonly value: DiceValue
  readonly rolling?: boolean
  readonly size?: number
}

export const Dice = ({ value, rolling, size = 200 }: DiceProps): JSX.Element => {
  const [rollValue, setRollValue] = useState(value)

  useEffect(() => {
    if (!rolling) {
      return
    }

    const getValue = (): number => {
      const newValue = createRandom().integerBetween(1, 6)
      return newValue === rollValue ? getValue() : newValue
    }

    const timeoutId = setTimeout(() => {
      setRollValue(getValue())
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [rolling, rollValue])

  return (
    <DiceViewport size={size}>
      <DiceContainer size={size} value={rolling ? rollValue : value} rolling={rolling}>
        {Object.entries(valueLocationMap).map(([value, location]) => (
          <DiceFace size={size} location={location}>
            {value}
          </DiceFace>
        ))}
      </DiceContainer>
    </DiceViewport>
  )
}
