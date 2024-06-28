module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testMatch: ["**/steps/*.steps.js"],
    moduleFileExtensions: ["js", "jsx", "json", "node", "css", "jpg"],
    preset: "jest-puppeteer",
}