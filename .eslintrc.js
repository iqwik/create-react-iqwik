module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            'jsx': true,
        },
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
        serviceworker: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking' // @TODO - Включить в будущем
    ],
    plugins: [
        'react',
        'react-hooks',
        'import',
        'jsx-a11y',
        '@typescript-eslint',
    ],
    rules: {
        'semi': ['error', 'never'],
        'no-underscore-dangle': 'off',
        'no-unexpected-multiline': 'error',
        'indent': ['error', 4],
        'import/no-cycle': ['error', { ignoreExternal: true }], // @TODO - или перейти на ItemFactory, см. https://stackoverflow.com/a/35560750
        // 'object-curly-newline': ["error", { "multiline": true }], // @TODO - включить в будущем
        'react-hooks/exhaustive-deps': 'off',
        'template-curly-spacing': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/mouse-events-have-key-events': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'no-restricted-properties': ['off', { object: 'Math' }],
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'react/destructuring-assignment': 'off',
        'react/no-array-index-key': 'off',
        'react/state-in-constructor': 'off',
        'react/display-name': 'off',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'react/no-multi-comp': ['error', { ignoreStateless: true }],
        'import/no-named-as-default': 'off',
        'import/prefer-default-export': 'off',
        'max-len': 'off',
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-types': 'off', // @TODO - включить в будущем
        '@typescript-eslint/no-shadow': 'off', // @TODO - включить в будущем
        '@typescript-eslint/indent': 'off', // @TODO - включить в будущем
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/naming-convention': 'off', // @TODO - включить в будущем
        '@typescript-eslint/no-this-alias': 'off', // @TODO - включить в будущем
        '@typescript-eslint/explicit-module-boundary-types': 'off', // @TODO - включить в будущем
        // @TODO - see https://github.com/benmosher/eslint-plugin-import/issues/1174
        // @TODO - look at https://github.com/Dreamscapes/eslint-import-resolver-lerna
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'error',
        '@typescript-eslint/no-explicit-any': 'off', // @TODO - Убрать в будущем, когда финализируются большая часть типов
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": ["error"]
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            'alias': {
                'map': [
                    ['_app', './src'],
                ],
                'extensions': ['.js', '.jsx', '.ts', '.tsx']
            },
            // node: {
            //     extensions: ['.js', '.ts', '.tsx', '.d.ts'],
            // },
            // 'webpack': {
            //     'config': 'config/webpack.dev.js'
            // }
        },
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'react/prop-types': 'off',
                '@typescript-eslint/explicit-function-return-type': ['off', { allowExpressions: true }], // @TODO - Включить 'error' в будущем
            },
        },
        {
            files: ['*.js', '*.jsx'],
            rules: {
                'react/prop-types': 'error',
                'react/default-props-match-prop-types': 'off', // restore when done https://github.com/yannickcr/eslint-plugin-react/issues/1674
            },
        },
    ],
    ignorePatterns: [
        '.eslintrc.js',
        'node_modules',
        'config',
        'build',
    ]
}
