const path = require('path')

// @NOTE - Deprecated, consider upgrading webpack to version 5 and setup cache https://webpack.js.org/configuration/other-options/#cache
const cacheLoader = () => {
    return {
        loader: 'cache-loader',
        options: {
            cacheDirectory: path.resolve(
                __dirname,
                '../../node_modules/.cache/cache-loader'
            ),
        },
    }
}

module.exports = cacheLoader
