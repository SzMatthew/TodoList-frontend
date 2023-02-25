module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: 'plugin:react/recommended',
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'func-names': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
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
    'no-multi-spaces': 'warn',
    'react/jsx-fragments': 'error',
    'react/jsx-key': 'warn',
    'react/prop-types': 'off', // Since we do not use prop-types
    'react/require-default-props': 'off', // Since we do not use prop-types
    curly: ['error', 'all'],
    'padded-blocks': ['error', 'never'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 8 }],
    'no-debugger': 'warn',
  }
};
