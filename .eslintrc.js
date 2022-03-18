module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': 0,
    'no-debugger': 0,
    "vue/no-unused-vars": 0,
    "no-unused-vars": 0,
    "vue/multi-word-component-names": 0,
    "vue/no-duplicate-attributes": 0,
    "vue/no-unused-components": 0,
    "no-unused-components": 0,
    "no-unused-labels": 0,
    "no-undef": 0,
  }
}
