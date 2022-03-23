module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: 'eslint:recommended',
    globals: {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
        'VERSION': true,
        'ROOT': true
    },
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module'
    },
    root: true,
    rules: {
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
