#!/usr/bin/env node

const path = require('path')
const exists = require('fs').existsSync // 判断 路径是否存在
const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const download = require('git-clone')
const clone = require('git-clone/promise')
const shell = require('shelljs')
const spawn = require('child_process').spawn

/**
 * 注册一个help的命令
 * 当在终端输入 dg --help 或者没有跟参数的话
 * 会输出提示
 */
program.on('--help', () => {
  {
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # create a new project with oms-cli')) // 会以灰色字体显示
    console.log(chalk.greenBright('    $ oms create my-project'))
  }
})
program
  .command('create <app-name>')
  .description('create a new project powered by oms-cli')
  .option('-c, --clone', 'Use git clone when fetching remote repository')
  .action((name, options) => {
    if (!name) {
      program.help()
    } else {
      const pkg = require('./package.json')
      console.log(chalk.blueBright(`Oms CLI v${pkg.version}`))
      handelPro(name)
    }
  })
/**
 * 判断参数是否为空
 * 如果为空调用上面注册的 help命令
 * 输出提示
 */
function help() {
  program.parse(process.argv) //commander 用来处理 命令行里面的参数， 这边的process是node的一个全局变量不明白的可以查一下资料
  // console.log(program.args)
  if (program.args.length < 1) return program.help()
}
help()

/**
 * 处理项目文件夹
 * 判断这个项目路径是否存在也就是是否存在相同的项目名
 * 如果存在提示 是否继续然后运行 run
 * 如果不存在 则直接运行 run 最后会创建一个项目目录
 */
function handelPro(name) {
  // const rawName = program.args[0] // 第二个参数 项目目录
  const rawName = name
  const to = path.resolve(rawName) // 构建的项目的 绝对路径
  if (exists(to)) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: `项目名${rawName}已经存在，是否确认继续 ?`,
          name: 'ok'
        }
      ])
      .then(answers => {
        if (answers.ok) {
          run(name)
        }
      })
  } else {
    run(name)
  }
}

/**
 * run函数则是用来调用generate来构建项目
 */
function run(name) {
  let giturl = 'https://github.com/vuejs/vue-next-webpack-preview.git'
  giturl = 'https://gitee.com/product_centerfront_end/burgeon-internationalization.git'
  giturl = 'https://gitee.com/product_centerfront_end/front-standard-product.git'

  /* download(giturl, `./${name}`, { checkout: 'sit' }, (err, res) => {
    if (err) {
      console.log(chalk.yellow(err))
      return
    }
    shell.rm('-rf', `${name}/.git`)
    console.log(
      chalk.green(`
        创建项目${name}成功
        cd ${name} 进入项目
        npm install
        npm start
      `)
    )
  }) */
  var p1 = new Promise(function (resolve, reject) {
    console.log()
    console.log(chalk.yellow(`============ 项目${name}正在创建中...... =============`))
    console.log()
    // 异步操作 resolve(obj1)  或者 reject(obj2) });
    clone(giturl, `./${name}`, { checkout: 'sit' })
      .then(res => {
        resolve()
        shell.cd(name)
        shell.rm('-rf', `${name}/.git`)
        console.log(chalk.green('Project created successfully ！'))
        console.log()
        installDependencies(name)
      })
      .catch(err => {
        reject()
        console.log(chalk.yellow(err))
        return
      })
  })
  /* clone(giturl, `./${name}`, { checkout: 'sit' })
    .then(res => {
      shell.cd(name)
      shell.rm('-rf', `${name}/.git`)
      console.log(chalk.green('Project created successfully ！'))
      installDependencies(name)
    })
    .catch(err => {
      console.log(chalk.yellow(err))
      return
    }) */
}

async function installDependencies(params) {
  const { ok } = await inquirer.prompt([
    {
      type: 'confirm',
      message: '是否安装依赖并启动项目?',
      name: 'ok'
    }
  ])
  if (ok) {
    // shell.exec('npm install')
    const runPro = spawn('npm', ['i', 'install'])
    runPro.on('close', status => {
      if (status == 0) {
        shell.exec('npm start')
      } else {
        onError(new Error("'npm start' failed with status " + status))
      }
    })
  } else {
    console.log(
      chalk.green(`
        创建项目${name}成功
        cd ${name} 进入项目
        npm install
        npm start
      `)
    )
  }
}

/* inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name ?'
      }
    ])
    .then(res => {
      // console.log(res)
      const { name } = res
      let giturl = 'https://gitee.com/product_centerfront_end/burgeon-internationalization.git'
      download(giturl, `./${name}`, () => {
        shell.rm('rf', `${name}/.git`)
        shell.cd(name)
        shell.exec('npm install')
        console.log(`
        创建项目${name}成功
        cd ${name} 进入项目
        oms run ${name} 启动项目
        oms start ${name} 预览项目
      `)
      })
    }) */
