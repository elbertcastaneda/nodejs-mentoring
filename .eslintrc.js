module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['import', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/indent': 'off',
  },
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
