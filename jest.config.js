// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path')

module.exports = {
  transform: { '^.+\\.[tj]sx?$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: '/src/.*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  resolver: resolve(__dirname, 'jest.resolve'),
}
