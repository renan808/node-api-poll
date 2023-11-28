module.exports = {
  preset: '@shelf/jest-mongodb',

  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  coverageProvider: 'v8',

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
