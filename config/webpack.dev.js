const path = require('path')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { eslintProcessing, BUNDLE_FOLDER } = require('./utils')
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, `../${BUNDLE_FOLDER}`),
        },
        open: true,
        hot: true,
    },
    plugins: eslintProcessing(
        [
            new HtmlWebpackPlugin({
                title: 'Develope mode',
                filename: 'index.html',
                template: path.resolve(__dirname, './index.html'),
                minify: false,
                hash: false,
            }),
            new DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
        ]
    )
})
