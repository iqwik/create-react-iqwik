#!/usr/bin/env node
const fs = require("fs-extra")
const path = require("path")
const https = require("https")
const { exec } = require("child_process")
const chalk = require('chalk')

const packageJson = require("../package.json")

const scripts = `"build": "webpack --config config/webpack.prod.js --color -p --hide-modules --display-optimization-bailout",
"watch": "nodemon --exec \"webpack-dev-server --config config/webpack.dev.js\"",
"lint": "eslint --ignore-path .gitignore --ext .js,.jsx,.ts,.tsx .",
"prunecache": "rimraf ./node_modules/.cache/"`

// const babel = `"babel": ${JSON.stringify(packageJson.babel)}`

const getDeps = (deps) => (
    Object.entries(deps)
        .map((dep) => `${dep[0]}@${dep[1]}`)
        .toString()
        .replace(/,/g, " ")
        .replace(/^/g, "")
        // исключим зависимость, используемую только в этом файле, не относящуюся к шаблону
        .replace(/fs-extra[^\s]+/g, "")
)

console.log("Initializing project..")

// создадим папку и инициализируем npm-проект
exec(
    `mkdir ${process.argv[2]} && cd ${process.argv[2]} && yarn init --yes`,
    (onInitError) => {
        if (onInitError) {
            console.log()
            console.error(chalk.red(`Error: ${onInitError}`))
            return
        }

        const packageJSON = `${process.argv[2]}/package.json`
        // заменим скрипты, задаваемые по умолчанию
        fs.readFile(packageJSON, (error, file) => {
            if (error) {
                throw error
            }
            const data = file
                .toString()
                .replace('"test": "echo \\"Error: no test specified\\" && exit 1"', scripts)
                // .replace('"keywords": []', babel)
            fs.writeFile(packageJSON, data, (innerError) => innerError || true)
        })

        const filesToCopy = [
            ".editorconfig",
            ".eslintrc.js",
            "babel.config/js",
            "LICENSE",
            "nodemon.json",
            "polyfill.js",
            "README.md",
            "tsconfig.json",
            "types.d.ts",
            "config/webpack.common.js",
            "config/webpack.dev.js",
            "config/webpack.prod.js",
            "config/index.html",
            "config/utils/cacheLoader.js",
            "config/utils/constants.js",
            "config/utils/cssProcessing.js",
            "config/utils/eslintProcessing.js",
            "config/utils/index.js",
        ]

        for (let i = 0; i < filesToCopy.length; i += 1) {
            fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`))
                .pipe(
                    fs.createWriteStream(`${process.argv[2]}/${filesToCopy[i]}`)
                )
        }
        // yarn, при установке пакета, удалит файл .gitignore, поэтому его нельзя скопировать из локальной папки шаблона,
        // этот файл нужно загрузить. После отправки кода в GitHub-репозиторий пользуйтесь raw-файлом .gitignore
        https.get(
            "https://raw.githubusercontent.com/iqwik/create-react-iqwik/master/.gitignore",
            (res) => {
                res.setEncoding("utf8")
                let body = ""
                res.on("data", (data) => {
                    body += data
                })
                res.on("end", () => {
                    fs.writeFile(
                    `${process.argv[2]}/.gitignore`,
                    body,
                    { encoding: "utf-8" },
                    (err) => {
                        if (err) throw err
                    }
                    )
                })
            }
        )
        console.log()
        console.log(chalk.green('yarn init -- done'))
        console.log()
        // установка зависимостей
        console.log('Installing deps -- it might take a few minutes...')

        const devDeps = getDeps(packageJson.devDependencies)
        const deps = getDeps(packageJson.dependencies)
        exec(
            `cd ${process.argv[2]} && git init && node -v && yarn -v && yarn add -D ${devDeps} && yarn add ${deps}`,
            (yarnError, yarnStdout, yarnStderr) => {
                if (yarnError) {
                    console.log()
                    console.error(chalk.red(`Some error while installing dependencies ${yarnError}`))
                    return
                }
                console.log()
                console.log(yarnStdout)
                console.log()
                console.log('Dependencies installed!')
                console.log()
                console.log('Copying additional files..')
                // копирование дополнительных файлов с кодом
                fs.copy(path.join(__dirname, "../src"), `${process.argv[2]}/src`)
                    .then(() => {
                        console.log()
                        console.log(chalk.green('Success! Your project is now ready'))
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
                        console.log('Happy hacking!')
                    })
                    .catch((err) => console.error(err))
            }
        )
    }
)
