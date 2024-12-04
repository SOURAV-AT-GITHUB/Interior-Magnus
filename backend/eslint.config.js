// eslint.config.js (CommonJS syntax)
const { Linter } = require('eslint');
const eslintPluginNode = require('eslint-plugin-node');

/** @type {Linter.Config} */
const config = [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      node: eslintPluginNode,  // Correct format for plugins
    },
    rules: {
      "no-console": "warn", // Custom rules
    },
  },
];

module.exports = config;
