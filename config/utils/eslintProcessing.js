const ESLintPlugin = require('eslint-webpack-plugin')

const enableEslint = true

const eslintProcessing = (plugins) => {
    return enableEslint ? [
        ...plugins,
        new ESLintPlugin({
            emitWarning: true,
        })
    ] : plugins
}

module.exports = eslintProcessing
