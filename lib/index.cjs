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
  },
  globals: {
    Map: 'readonly',
    Set: 'readonly',
    WeakMap: 'readonly',
    Symbol: 'readonly',
  },
  overrides: [
    {
      files: ['test/*.test.js'],
      globals: {
        it: 'readonly',
        describe: 'readonly',
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
