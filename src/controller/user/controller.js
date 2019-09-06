
// 用户信息管理
const mongoose = require('mongoose')

const { getToken } = require('../../common/token')
const svc = require('../util/service')

// 用户注册
const register = async (ctx) => {
  try {
    const { name , password } = ctx.request.body
    const User = mongoose.model('user')
    await User.create({ name, password })
    ctx.body = svc.returnBody(0, '注册成功')
  } catch (err) {
    ctx.body = svc.returnBody(1, err, '注册失败')
  }
}

// 用户登录
const login = async (ctx) => {
  try {
    const { name, password } = ctx.request.body
    const User = mongoose.model('user')
    const user = await User.findOne({ name: name, password: svc.encryptStr(password) })
    if (user) {
      const token = await getToken(user._id)
      ctx.body = svc.returnBody(0, token, '登录成功')
      return
    }
    ctx.body = svc.returnBody(1, '用户不存在')
  } catch (err) {
    ctx.body = svc.returnBody(1, err, '登录失败')
  }
}

// 获取用户列表
const getUserList = async (ctx) => {
  try {
    const User = mongoose.model('user')
    const users = await User.find()
    ctx.body = svc.returnBody(0, users, '获取成功')
  } catch(err) {
    console.log(err)
  }
}

module.exports.router = (root, unroot) => {
  unroot.post('/user/login', login)
  unroot.post('/user/register', register)
  root.get('/user/getUserList', getUserList)
}