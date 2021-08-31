import clamp from './clamp'

export default function clamp01(value: number) {
    return clamp(0, 1, value)
}
