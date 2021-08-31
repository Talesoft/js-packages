import type { RandomResult } from '@talesoft/random'
import { createRandom } from '@talesoft/random'
import { push, updateIndex, updateKey } from '@talesoft/immutable'

export type DiceValue = number

export type Double = {
  readonly value: DiceValue
  readonly indexes: number[]
  readonly count: number
}

export type Straight = {
  readonly indexes: number[]
  readonly count: number
}

export type DiceRoll = {
  readonly values: DiceValue[]
  readonly lockedIndexes: number[]
  readonly doubles: Double[]
  readonly straights: Straight[]
}

export const emptyRoll: DiceRoll = {
  values: [],
  lockedIndexes: [],
  doubles: [],
  straights: [],
}

type RollValueResult = {
  readonly random: RandomResult
  readonly values: number[]
}

const findDoubles = (values: DiceValue[]) =>
  values.reduce((doubles, value) => {
    const indexes = values
      .map((otherValue, otherIndex) => [otherValue, otherIndex])
      .filter(([otherValue]) => value === otherValue)
      .map(([, otherIndex]) => otherIndex)

    // Check if it's a double and if it's not yet registered as one with that value
    if (indexes.length < 2 || doubles.find(double => double.value === value)) {
      return doubles
    }
    const double: Double = {
      value,
      count: indexes.length,
      indexes: indexes,
    }
    return push(double, doubles)
  }, [] as Double[])

const findStraights = (values: DiceValue[], options: GameOptions) =>
  values.reduce((straights, value) => {
    const neededValues = Array.from(
      { length: options.maxDiceValue - value },
      (_, index) => value + index,
    )
    const { straights: newStraights } = neededValues.reduce(
      (result, neededValue) => {
        if (result.done) {
          return result
        }

        const foundIndex = values.findIndex(otherValue => otherValue === neededValue)
        if (foundIndex === -1) {
          return {
            ...result,
            done: true,
          }
        }

        const newStraight = {
          ...result.currentStraight,
          count: result.currentStraight.count + 1,
          indexes: push(foundIndex, result.currentStraight.indexes),
        }
        return {
          ...result,
          currentStraight: newStraight,
          straights: push(newStraight, result.straights),
        }
      },
      {
        done: false,
        currentStraight: { count: 0, indexes: [] } as Straight,
        straights: [] as Straight[],
      },
    )

    if (newStraights.length < 1) {
      return straights
    }

    return straights.concat(newStraights)
  }, [] as Straight[])

export type RollResult = {
  roll: DiceRoll
  seed: number
}

export const nextRoll = (options: GameOptions, seed: number, lastRoll: DiceRoll): RollResult => {
  const initialResult: RollValueResult = {
    random: createRandom(seed),
    values: [],
  }
  const { random, values } = Array.from({ length: options.diceCount }, () => 0).reduce(
    ({ random, values }, _, index) =>
      lastRoll.lockedIndexes.includes(index)
        ? {
            random,
            values: push(lastRoll.values[index], values),
          }
        : {
            random: random.next,
            values: push(random.integerBetween(options.minDiceValue, options.maxDiceValue), values),
          },
    initialResult,
  )
  const doubles = findDoubles(values)
  const straights = findStraights(values, options)
  const roll: DiceRoll = {
    values,
    doubles,
    straights,
    lockedIndexes: lastRoll.lockedIndexes,
  }
  return { roll, seed: random.seed }
}

export type AllValuesScoreStrategy = {
  type: 'allValues'
}

export const allValues: AllValuesScoreStrategy = { type: 'allValues' }

export type MatchingValuesScoreStrategy = {
  type: 'matchingValues'
}

export const matchingValues: MatchingValuesScoreStrategy = { type: 'matchingValues' }

export type FixedScoreStrategy = {
  type: 'fixed'
  score: number
}

export const fixed = (score: number): FixedScoreStrategy => ({ type: 'fixed', score })

export type ScoreStrategy =
  | AllValuesScoreStrategy
  | MatchingValuesScoreStrategy
  | FixedScoreStrategy

export type DiceConditionId = string
export type DiceConditionGroupId = string

export type DiceConditionMetadata = {
  name: string
  scoreStrategy: ScoreStrategy
}

export type ValueMatchDiceCondition = {
  type: 'valueMatch'
  value: DiceValue
} & DiceConditionMetadata

export const values = (
  value: DiceValue,
  name: string,
  scoreStrategy: ScoreStrategy,
): ValueMatchDiceCondition => ({
  type: 'valueMatch',
  value: value,
  name,
  scoreStrategy,
})

export type DoublesDiceCondition = {
  type: 'doubles'
  minDoubles: number
} & DiceConditionMetadata

export const doubles = (
  minDoubles: number,
  name: string,
  scoreStrategy: ScoreStrategy,
): DoublesDiceCondition => ({
  type: 'doubles',
  minDoubles,
  name,
  scoreStrategy,
})

export type StraightDiceCondition = {
  type: 'straight'
  minLength: number
} & DiceConditionMetadata

export const straight = (
  minLength: number,
  name: string,
  scoreStrategy: ScoreStrategy,
): StraightDiceCondition => ({
  type: 'straight',
  minLength,
  name,
  scoreStrategy,
})

export type ComposedDiceCondition = {
  type: 'oneOf' | 'allOf' | 'not'
  conditions: DiceCondition[]
} & DiceConditionMetadata

export const oneOf = (
  conditions: DiceCondition[],
  name: string,
  scoreStrategy: ScoreStrategy,
): ComposedDiceCondition => ({
  type: 'oneOf',
  conditions,
  name,
  scoreStrategy,
})

export const allOf = (
  conditions: DiceCondition[],
  name: string,
  scoreStrategy: ScoreStrategy,
): ComposedDiceCondition => ({
  type: 'allOf',
  conditions,
  name,
  scoreStrategy,
})

export const not = (
  conditions: DiceCondition[],
  name: string,
  scoreStrategy: ScoreStrategy,
): ComposedDiceCondition => ({
  type: 'not',
  conditions,
  name,
  scoreStrategy,
})

export type DiceCondition =
  | ValueMatchDiceCondition
  | DoublesDiceCondition
  | StraightDiceCondition
  | ComposedDiceCondition

export type DiceConditionSet = Record<DiceConditionId, DiceCondition>

export type BonusGroupReward = {
  type: 'bonus'
  minScore: number
  bonusScore: number
}

export const bonus = (minScore: number, bonusScore: number): BonusGroupReward => ({
  type: 'bonus',
  minScore,
  bonusScore,
})

export type GroupReward = BonusGroupReward

export type DiceConditionGroup = {
  name: string
  conditionIds: DiceConditionId[]
  rewards: GroupReward[]
}

export const group = (
  name: string,
  conditionIds: DiceConditionId[],
  rewards: GroupReward[],
): DiceConditionGroup => ({
  name,
  conditionIds,
  rewards,
})

export type DiceConditionGroupSet = Record<DiceConditionGroupId, DiceConditionGroup>

export const defaultConditions: DiceConditionSet = {
  ones: values(1, 'Ones', matchingValues),
  twos: values(2, 'Twos', matchingValues),
  threes: values(3, 'Threes', matchingValues),
  fours: values(4, 'Fours', matchingValues),
  fives: values(5, 'Fives', matchingValues),
  sixes: values(6, 'Sixes', matchingValues),

  threeDoubles: doubles(3, 'Three Doubles', allValues),
  fourDoubles: doubles(4, 'Four Doubles', allValues),
  fullHouse: allOf(
    [doubles(2, 'Full House Double', fixed(0)), doubles(3, 'Full House Triple', fixed(0))],
    'Full House',
    fixed(25),
  ),
  smallStraight: straight(4, 'Small Straight', fixed(30)),
  largeStraight: straight(5, 'Long Straight', fixed(40)),
  yahtzee: doubles(5, 'Yahtzee', fixed(50)),
  chance: allOf([], 'Chance', allValues),
}

export const defaultGroups: DiceConditionGroupSet = {
  eyes: group('Eyes', ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'], [bonus(63, 35)]),
  extra: group('Extra', ['*'], []),
}

export type ScoreSet = Record<DiceConditionId, number>

export type Player = {
  name: string
  scores: ScoreSet[]
  rolls: DiceRoll[]
  currentRolls: DiceRoll[]
}

export const createPlayer = (name: string): Player => ({
  name,
  scores: [{}],
  rolls: [],
  currentRolls: [],
})

export type GameOptions = {
  initialSeed: number
  diceCount: number
  minDiceValue: DiceValue
  maxDiceValue: DiceValue
  maxRolls: number
  conditions: DiceConditionSet
  groups: DiceConditionGroupSet
}

export const createGameOptions = (options: Partial<GameOptions>): GameOptions => ({
  initialSeed: createRandom().seed,
  diceCount: 5,
  minDiceValue: 1,
  maxDiceValue: 6,
  maxRolls: 3,
  ...options,
  conditions: {
    ...defaultConditions,
    ...options.conditions,
  },
  groups: {
    ...defaultGroups,
    ...options.groups,
  },
})

export type GameStatus = 'rolling' | 'scoring'

export type GameState = {
  status: GameStatus
  players: Player[]
  currentRound: number
  currentPlayerIndex: number
  currentSeed: number
  options: GameOptions
}

export const createGameState = (players: Player[], options: GameOptions): GameState => ({
  status: 'rolling',
  players,
  options,
  currentRound: 0,
  currentPlayerIndex: 0,
  currentSeed: options.initialSeed,
})

export const updatePlayer = (
  index: number,
  update: (player: Player) => Player,
  gameState: GameState,
): GameState => updateKey('players', players => updateIndex(index, update, players), gameState)

export const updateCurrentPlayer = (
  update: (player: Player) => Player,
  gameState: GameState,
): GameState => updatePlayer(gameState.currentPlayerIndex, update, gameState)

export const getCurrentPlayer = (gameState: GameState): Player =>
  gameState.players[gameState.currentPlayerIndex]

export const getLastRoll = (gameState: GameState): DiceRoll => {
  const player = getCurrentPlayer(gameState)
  return player.currentRolls[player.currentRolls.length - 1] ?? emptyRoll
}

export const canRoll = (gameState: GameState): boolean =>
  getCurrentPlayer(gameState).currentRolls.length < gameState.options.maxRolls

export const roll = (gameState: GameState): GameState => {
  if (gameState.status !== 'rolling') {
    return gameState
  }

  const lastRoll = getLastRoll(gameState)
  const { seed, roll: newRoll } = nextRoll(gameState.options, gameState.currentSeed, lastRoll)

  return {
    ...updateCurrentPlayer(
      player => updateKey('currentRolls', currentRolls => push(newRoll, currentRolls), player),
      gameState,
    ),
    status: 'scoring',
    currentSeed: seed,
  }
}
