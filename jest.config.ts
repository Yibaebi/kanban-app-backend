module.exports = {
  rootDir: '.',
  roots: ['./src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleNameMapper: {
    '@models': '<rootDir>/src/models/index',
    '@start': '<rootDir>/src/start/index',
    '@config': '<rootDir>/src/config/index',
    '@middleware': '<rootDir>/src/middleware/index',
    '@controllers': '<rootDir>/src/controllers/index',
    '@constants': '<rootDir>/src/constants/index',
    '@routes': '<rootDir>/src/routes/index',
    '@utils': '<rootDir>/src/utils/index',
    '@validators': '<rootDir>/src/validators/index',
    '@root/types': '<rootDir>/src/types/index'
  },
  coverageReporters: ['json', 'lcov', 'clover']
}
