#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const https = require('https')
const cp = require('child_process')
const chalk = require('chalk')

const packageJson = require('../package.json')

const scripts = `"license": "MIT",
  "scripts": {
    "build": "webpack --config config/webpack.prod.js --color -p --hide-modules --display-optimization-bailout",
    "watch": "webpack-dev-server --config config/webpack.dev.js",
    "lint": "eslint --ignore-path .gitignore --ext .js,.jsx,.ts,.tsx .",
    "prunecache": "rimraf ./node_modules/.cache/"
  }`

const getDeps = (deps) => (
    Object.entries(deps)
        .map((dep) => `${dep[0]}@${dep[1]}`)
        .toString()
        .replace(/,/g, ' ')
        .replace(/^/g, '')
        .replace(/fs-extra[^\s]+/g, '')
)

console.log()
console.log(chalk.yellow('Initializing project..'))

const folder = process.argv[2]

cp.exec(
    `mkdir ${folder} && cd ${folder} && mkdir config && cd config && mkdir utils && cd ../ && yarn init --yes`,
    (onInitError, stdout, stderr) => {
        console.log(stdout, stderr)
        if (onInitError) {
            throw onInitError
            // console.log()
            // console.log(chalk.red(onInitError))
            // return
        }

        const packageJSON = `${folder}/package.json`
        fs.readFile(packageJSON, (error, file) => {
            if (error) {
                throw error
            }
            const data = file
                .toString()
                .replace('"license": "MIT"', scripts)

            fs.writeFile(packageJSON, data, (innerError) => {
                if (innerError) {
                    console.log(chalk.red(innerError))
                    return
                }
                return true
            })
        })

        const filesToCopy = [
            '.editorconfig',
            '.eslintrc.js',
            'babel.config.js',
            'README.md',
            'tsconfig.json',
            'types.d.ts',
            'config/webpack.common.js',
            'config/webpack.dev.js',
            'config/webpack.prod.js',
            'config/index.html',
            'config/utils/cacheLoader.js',
            'config/utils/constants.js',
            'config/utils/cssProcessing.js',
            'config/utils/eslintProcessing.js',
            'config/utils/index.js',
        ]

        for (let i = 0; i < filesToCopy.length; i += 1) {
            fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`))
                .pipe(
                    fs.createWriteStream(`${folder}/${filesToCopy[i]}`)
                )
        }

        https.get(
            'https://raw.githubusercontent.com/iqwik/create-react-iqwik/master/.gitignore',
            (res) => {
                res.setEncoding('utf8')
                let body = ''
                res.on('data', (data) => {
                    body += data
                })
                res.on('end', () => {
                    fs.writeFile(
                    `${folder}/.gitignore`,
                    body,
                    { encoding: 'utf-8' },
                    (err) => {
                        if (err) throw err
                    }
                    )
                })
            }
        )
        console.log()
        console.log(chalk.green.bold('yarn init -- done'))
        console.log()
        console.log(chalk.yellow('Installing template dependencies -- it might take a few minutes...'))

        const devDeps = getDeps(packageJson.devDependencies)
        const deps = getDeps(packageJson.dependencies)
        cp.exec(
            `cd ${folder} && node -v && yarn -v && yarn add -D ${devDeps} && yarn add ${deps}`,
            (yarnError, yarnStdout, yarnStderr) => {
                if (yarnError) {
                    console.log()
                    console.log(chalk.red(`Some error while installing dependencies ${yarnError}`))
                    return
                }
                console.log()
                console.log(yarnStdout)
                console.log()
                console.log(chalk.green.bold('Dependencies installed!'))
                console.log()
                console.log(chalk.yellow('Copying additional files..'))
                fs.copy(path.join(__dirname, '../src'), `${folder}/src`)
                    .then(() => {
                        console.log()
                        console.log(chalk.green.bold('Success! Your project is now ready'))
                        console.log()
                        console.log('Inside that directory, you can run several commands:')
                        console.log()
                        console.log(chalk.cyan('  yarn watch'))
                        console.log('    Starts the development server.')
                        console.log()
                        console.log(chalk.cyan('  yarn build'))
                        console.log('    Bundles the app into static files for production.')
                        console.log()
                        console.log(chalk.cyan('  yarn lint'))
                        console.log('    Starts eslint check.')
                        console.log()
                        console.log(chalk.cyan('  yarn prunecache'))
                        console.log('    Clears node_modules/.cache/')
                        console.log()
                        console.log(chalk.yellow('Happy hacking!'))
                    })
                    .catch((err) => console.log(err))
            }
        )
    }
)
