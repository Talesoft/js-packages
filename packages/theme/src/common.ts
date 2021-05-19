export type Size = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
export type SizeMap<Value, Sizes extends string = Size> = Record<Sizes, Value>
