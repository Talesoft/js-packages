module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                semi: false,
                trailingComma: 'all',
                singleQuote: true,
                printWidth: 100,
                tabWidth: 2,
                arrowParens: 'avoid',
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    env: {
        node: true,
    },
}
