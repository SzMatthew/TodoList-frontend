module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': 'plugin:react/recommended',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 8,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'keyword-spacing': 'error',
        'space-before-blocks': 'error',
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        'react/prop-types': 0,
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    }
};
