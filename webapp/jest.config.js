const {defaults} = require ("jest-config");

module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    testEnvironment:"jsdom",
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    collectCoverage:true,
    collectCoverageFrom:["!**/__tests__/**", "**/*.jsx"],
    transformIgnorePatterns: [
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.jsx$"
    ]
};