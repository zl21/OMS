const fs = require('fs')
const path = require('path')
const filepath2 = path.resolve(__dirname, '.npmrc')

fs.readFile(filepath2, (err, data) => {
  if (err) return
  const content2 = "registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=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"
  fs.writeFile(filepath2, content2, { flag: 'w' }, err => {
    if (err) {
      return
    }
  })
})
