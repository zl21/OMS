#!/usr/local/bin/node

const inquirer = require('inquirer')
const download = require('git-clone')
const shell = require('shelljs')

inquirer
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
  })
