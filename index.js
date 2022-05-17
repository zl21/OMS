#!/usr/local/bin/node
/**
 * Node CLI 应用入口文件必须要有上面的文件头，其实就是node的安装路径中的node命令注册的地方（大概可以这么理解
 * Mac可以使用 'which node' 命令查看安装路径
 * 不同系统下这个头可能不一样
 * eg. windows:
 *  #!/usr/bin/env node
 */
// console.log('hello')
const program = require('commander')
const shell = require('shelljs')
const download = require('git-clone')
const { spawn } = require('child_process')
const open = require('open')

program.version('1.0.0')

program
  .command('new <name>')
  .description('创建项目')
  .action(name => {
    // let giturl = 'https://gitee.com/product_centerfront_end/front-standard-product.git'
    let giturl = 'https://github.com/vuejs/vue-next-webpack-preview.git'
    giturl = 'https://gitee.com/product_centerfront_end/burgeon-internationalization.git'
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
  })

program
  .command('run')
  .description('运行项目')
  .action(name => {
    // shell.exec('npm run dev')
    let cp = spawn('npm', ['run', 'dev'])
    cp.stdout.pipe(process.stdout)
    cp.stderr.pipe(process.stderr)
    cp.on('close', () => {
      console.log('运行项目成功')
    })
  })

program
  .command('start')
  .description('预览项目')
  .action(name => {
    open('http://localhost:8080/')
    console.log('预览项目成功')
  })
program.parse(process.argv)
