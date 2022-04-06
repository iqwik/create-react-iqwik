const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cacheLoader = require('./cacheLoader')

const cssProcessing = ({ withModules = true }) => {
    return {
        test: withModules ? /\.module\.(css|scss)$/ : /^((?!\.module).)*\.(css|scss)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false,
                },
            },
            { ...cacheLoader() },
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    ...(withModules ? {
                        modules: {
                            localIdentName: '[folder]__[local]__[hash:base64:6]',
                        },
                    } : {}),
                    sourceMap: true,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: ['autoprefixer'],
                    },
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('node-sass'),
                    sourceMap: true
                },
            },
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        path.resolve(__dirname, '../../src/styles/_variables.scss')
                    ],
                }
            },
        ],
    }
}

module.exports = cssProcessing
