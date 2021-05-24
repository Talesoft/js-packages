module.exports = {
  transform: { '^.+\\.[tj]sx?$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: '/src/.*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  resolver: '@talesoft/jest-bridge/cjs/resolve.cjs',
}
