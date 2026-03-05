export default {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'vue/multi-word-component-names': 'off',
  },
}
