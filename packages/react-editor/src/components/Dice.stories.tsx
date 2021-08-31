// import { action } from '@storybook/addon-actions'
import type { DiceValue } from '../builder'
import { Dice } from './Dice'

export default {
  title: 'Dices',
  component: Dice,
  argTypes: {
    rolling: false,
    value: 1,
    size: 200,
  },
}

export const BasicDice = (args: { value: DiceValue; rolling: boolean }): JSX.Element => {
  return <Dice {...args} />
}
