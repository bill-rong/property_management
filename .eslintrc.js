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
    "no-unused-vars": 0
  }
}
