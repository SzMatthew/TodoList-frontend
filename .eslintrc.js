module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  'extends': 'plugin:react/recommended',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': 'error',
    'react/prop-types': 0,
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    'indent': ['warn', 2],
    'space-infix-ops': 'warn',
    'no-multi-spaces': 'warn'
  }
};
