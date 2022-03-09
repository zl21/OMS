const fs = require('fs')
const path = require('path')
var https = require('follow-redirects').https
const filepath = path.resolve(__dirname, 'README.md')
const filepath1 = path.resolve(__dirname, 'package.json')
var content = '',
  text = '',
  title = '',
  pack = null
// fs.copyFileSync('./package.json', './package.copy.json') */
fs.readFile(filepath, (err, data) => {
  if (err) return
  content = data.toString()
})
fs.readFile(filepath1, (err, data) => {
  if (err) return
  pack = JSON.parse(data.toString())
  title = `@bojun/oms-ui@${pack.version} 发版啦！点击链接查看cdn。`
})

var options = {
  method: 'POST',
  hostname: 'oapi.dingtalk.com',
  path: '/robot/send?access_token=39ac3d54c6c7ef20d620ff213592c4eae9c810f7aa46c77f5e72855b94a24f14',
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
      // messageUrl: 'http://8.142.133.189:28880/'
      messageUrl: `https://cdn.jsdelivr.net/npm/@bojun/oms-ui@${pack.version}/burgeon.publish/businessComponents.min.js`
    }
  }
  var postData = JSON.stringify(body)
  req.write(postData)
  req.end()
}, 1000)
