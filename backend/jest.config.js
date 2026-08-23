module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  setupFiles: ['<rootDir>/test/jest.setup.js'],
  testTimeout: 30000,
  // MongoMemoryServer 인스턴스를 여러 개 동시에 띄우면 리소스가 무거워지므로 순차 실행한다.
  maxWorkers: 1
}
