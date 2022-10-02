module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['import', 'prettier'],
  rules: {},
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    createDefaultProgram: 'true',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
