const path = require('path')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')
const { BUNDLE_FOLDER } = require('./utils')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!assets/fonts/**', '!assets/img/**'],
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../src/assets/static'),
                to: path.resolve(__dirname, `../${BUNDLE_FOLDER}/assets`)
                
            }],
        }),
        new HtmlWebpackPlugin({
            title: 'React App',
            filename: 'index.html',
            publicPath: path.resolve(__dirname, `../${BUNDLE_FOLDER}`),
            template: path.resolve(__dirname, './index.html'),
            hash: true,
            minify: true,
            inject: 'body',
            scriptLoading: 'blocking',
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ]
})
