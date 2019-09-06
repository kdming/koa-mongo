// mongodb链接管理
const mongoose = require('mongoose')

const config = require('../config')

// 开启mongo日志输出
mongoose.set('debug', true)

// 设置异常重连次数
let limit = 5
let error = 0

const connect = () => {  
  try {
    const options = {
      useNewUrlParser: true,
      poolSize: 20,
    }
    mongoose.connect(config.parsed.mongoUrl, options)
    return mongoose.connection
  } catch (err) {
    console.log(err)
  }
}

mongoose.connection.on('connected', () => {
  error = 0
})

mongoose.connection.on('disconnection', () => {
  if (error < limit) connect()
  error += 1
})

mongoose.connection.on('error', (err) => {
  if (error < limit) connect()
  console.log(err)
})

module.exports.connect = connect