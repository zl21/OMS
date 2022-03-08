const fs = require('fs')
const path = require('path')
var https = require('follow-redirects').https
const filepath = path.resolve(__dirname, 'README.md')
const filepath1 = path.resolve(__dirname, 'package.json')
const filepath2 = path.resolve(__dirname, '.npmrc')
var content = '',
  text = '',
  title = ''
// fs.copyFileSync('./package.json', './package.copy.json') */
fs.readFile(filepath, (err, data) => {
  if (err) return
  content = data.toString()
})
fs.readFile(filepath1, (err, data) => {
  if (err) return
  pack = JSON.parse(data.toString())
  title = `@bojun/oms-ui@${pack.version} 发版啦！`
})

fs.readFile(filepath2, (err, data) => {
  if (err) return
  const content2 = "registry=https://registry.npmjs.org/:_authToken=${NPM_TOKEN}"
  fs.writeFile(filepath2, content2, { flag: 'w' }, err => {
    if (err) {
      return
    }
  })
})

var options = {
  method: 'POST',
  hostname: 'oapi.dingtalk.com',
  path: '/robot/send?access_token=5f27f7fbd530bb3dbb52280eca93f7944d05aee457ba19b279b90bdcc05a9e87',
  headers: {
    'Content-Type': 'application/json'
  },
  maxRedirects: 20
}

var req = https.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function (chunk) {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })

  res.on('error', function (error) {
    console.error(error)
  })
})

setTimeout(e => {
  text = content.split('|').slice(-3).join('|')
  const body = {
    msgtype: 'link',
    link: {
      text,
      title,
      picUrl: 'https://image.dbbqb.com/202203031702/563c99e7874db554e7b6e35b2199a2ef/O33Xo',
      messageUrl: 'http://8.142.133.189:28880/'
    }
  }
  var postData = JSON.stringify(body)
  req.write(postData)
  req.end()
}, 1000)
