/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    "@typescript-eslint/no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true,
      "allowTaggedTemplates": true
    }]
  }
};