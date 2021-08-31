export const rotateValue = (value: number, scale: number): number => {
  let rotatedValue = value
  while (value > scale) {
    rotatedValue -= scale
  }
  while (value < 0) {
    rotatedValue += scale
  }
  return rotatedValue
}
