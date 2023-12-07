module.exports = {
  preset: '@shelf/jest-mongodb',

  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
