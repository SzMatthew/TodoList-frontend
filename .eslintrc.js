module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: ['warn', 4],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent': ['warn', 4],
        'linebreak-style': ['off', 'windows'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/prop-types': [0],
    },
};
