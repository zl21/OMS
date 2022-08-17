// 使用 Mock 构建本地服务器 模拟数据
const Mock = require('mockjs')
const express = require('express')
const app = express()

function generatorList(num) {
  return Mock.mock({
    [`list|${num}`]: [
      {
        'id|+1': 1, // ID 自增方式追加
        title: '@ctitle(15,25)', // 标题 中文字符长15-25位
        image: '@natural(0,15)', // 图片索引 自然数1-15
        reads: '@natural(0,99999)', // 访问人数
        from: '@ctitle(3,10)', // 新闻来源
        date: "@date('yyyy-MM-dd')" // 发布时间
      }
    ]
  })
}

// 允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE', 'OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// 截取路由并反馈数据
app.get('/data', function (req, res) {
  const { num } = req.query
  return res.send(generatorList(num))
})

const server = app.listen(4000, function () {
  console.log('本地Mock服务启动，接口地址为：http://localhost:4000/data?num=?')
})
