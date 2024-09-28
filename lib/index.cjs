const fs = require('fs');
const { CachedInputFileSystem } = require('enhanced-resolve');
const pluginSyntaxDecorators = require('@babel/plugin-syntax-decorators').default;

module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['plugin:import/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [[pluginSyntaxDecorators, { version: '2023-05' }]],
    },
  },
  rules: {
    'no-undef': 'error',
    'no-fallthrough': 'error',
    'no-const-assign': 'error',
    'import/no-extraneous-dependencies': ['error'],
  },
  globals: {
    Map: 'readonly',
    Set: 'readonly',
    WeakMap: 'readonly',
    Symbol: 'readonly',
    Proxy: 'readonly',
    Promise: 'readonly',
  },
  overrides: [
    {
      files: ['test/*.test.js'],
      globals: {
        it: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
      },
    },
    {
      files: ['**/*.cjs'],
      globals: {
        require: 'readonly',
        module: 'readonly',
      },
    },
  ],
  settings: {
    'import/resolver': {
      'enhanced-resolve': {
        fileSystem: new CachedInputFileSystem(fs, 4000),
        conditionNames: ['import'],
      },
    },
  },
};
