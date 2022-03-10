module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: {
                    version: '3',
                    proposals: true,
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-transform-flow-strip-types',
        '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
        production: {
            plugins: [
                [
                    'transform-react-remove-prop-types',
                    {
                        additionalLibraries: ['airbnb-prop-types'],
                    },
                ],
            ],
        },
        test: {
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
            ],
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-transform-runtime',
                'dynamic-import-node',
            ],
        },
    },
}
