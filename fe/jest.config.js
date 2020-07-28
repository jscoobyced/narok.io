module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy",
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: [
    "<rootDir>/enzyme.ts"
  ],
  coverageReporters: [
    "lcov",
    "json",
    "text"
  ],
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  },
  coverageDirectory: "coverage",
}