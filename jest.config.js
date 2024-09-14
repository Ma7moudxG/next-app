module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/",
                                              "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
    },
    testEnvironment: "jsdom",
};