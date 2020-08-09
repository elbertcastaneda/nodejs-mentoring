module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    createDefaultProgram: 'true',
  },
};
