const { min, max } = Math

export default function clamp(minValue: number, maxValue: number, value: number) {
    return max(minValue, min(value, maxValue))
}
