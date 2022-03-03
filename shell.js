const fs = require('fs')
const path = require('path')
const filepath = path.resolve(__dirname, 'package.json')
const filepath2 = path.resolve(__dirname, '.npmrc')
let content = ''
const oriObj = {
  s1: `"url": "git@gitee.com:product_centerfront_end/burgeon-private-npm.git"`,
  s2: `"name": "@burgeon/business-components",`
}
const resObj = {
  s1: `"url": "git+https://github.com/zl21/BC_StoryBook.git"`,
  s2: `"name": "@alanh/oms-ui",`
}
// fs.copyFileSync('./package.json', './package.copy.json')
fs.readFile(filepath, (err, data) => {
  if (err) {
    return
  }
  content = data.toString()
  for (const key in oriObj) {
    if (content.includes(oriObj[key])) {
      console.log(oriObj[key])
      content = content.replace(oriObj[key], resObj[key])
    }
  }
  fs.writeFile(filepath, content, { flag: 'w' }, err => {
    if (err) {
      return
    }
  })
})
fs.readFile(filepath2, (err, data) => {
  if (err) {
    return
  }
  const content2 = `registry=https://registry.npmjs.org/`
  fs.writeFile(filepath2, content2, { flag: 'w' }, err => {
    if (err) {
      return
    }
  })
})
