export type DiceValue = number

export type Double = {
  value: DiceValue
  indexes: number
  count: number
}

export type Straight = {
  indexes: number
  count: number
}

export type DiceRoll = {
  values: DiceValue[]
  sortedValues: DiceValue[]
  lockedIndexes: number[]
  doubles: Double[]
  straights: Straight[]
}

export const emptyRoll: DiceRoll = {
  values: [],
  sortedValues: [],
  lockedIndexes: [],
  doubles: [],
  straights: [],
}

export const rand = (min: number, max: number) => min + Math.random() * (max - min)

export const nextRoll = (lastRoll: DiceRoll, options: GameOptions): DiceRoll => {
  const lockedValues = lastRoll.values.filter((_, index) => lastRoll.lockedIndexes.includes(index))
  const newValueCount = options.diceCount - lockedValues.length
  const newValues = [...lockedValues, Array.from({ length: newValueCount }, () => rand())]
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
  diceCount: number
  minDiceValue: DiceValue
  maxDiceValue: DiceValue
  maxRolls: number
  conditions: DiceConditionSet
  groups: DiceConditionGroupSet
}

export const createGameOptions = (options: Partial<GameOptions>): GameOptions => ({
  diceCount: 5,
  minDiceValue: 1,
  maxDiceValue: 6,
  maxRolls: 3,
  conditions: {
    ...defaultConditions,
    ...options.conditions,
  },
  groups: {
    ...defaultGroups,
    ...options.groups,
  },
})

export type GameState = {
  players: Player[]
  currentRound: number
  currentPlayerIndex: number
  options: GameOptions
}

export const createGameState = (players: Player[], options: GameOptions): GameState => ({
  currentRound: 0,
  currentPlayerIndex: 0,
  players,
  options,
})

const updateAt = <Value>(index: number, update: (value: Value) => Value, items: Value[]): Value[] =>
  items.map((itemValue, itemIndex) => (itemIndex === index ? update(itemValue) : itemValue))

export const updatePlayer = (
  index: number,
  update: (player: Player) => Player,
  gameState: GameState,
): GameState => ({
  ...gameState,
  players: updateAt(index, update, gameState.players),
})

export const updateCurrentPlayer = (
  update: (player: Player) => Player,
  gameState: GameState,
): GameState => updatePlayer(gameState.currentPlayerIndex, update, gameState)

export const currentPlayer = (gameState: GameState): Player =>
  gameState.players[gameState.currentPlayerIndex % gameState.players.length]

export const canRoll = (gameState: GameState): boolean =>
  currentPlayer(gameState).currentRolls.length < gameState.options.maxRolls

export const roll = (gameState: GameState): GameState => ({
  ...updateCurrentPlayer(player => player, gameState),
})
