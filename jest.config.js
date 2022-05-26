module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleDirectories: [
    'src',
    'node_modules',
  ],
  moduleFileExtensions: [
    'js',
    'vue',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'scr/**/*.spec.{js. vue}',
    '!**/plugins/**',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
  ],
};
