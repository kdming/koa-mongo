// token验证
const jwt = require('jwt-simple')
const moment = require('moment')

const userUtil = require('../../controller/user/util')
const svc = require('../../controller/util/service')
const config = require('../config')

const tokenKey = config.parsed.tokenKey

// 根据用户id生成token
const getToken = async (userId) => {
  const expDate = moment().add(30, 'minute').valueOf()
  const token = await jwt.encode({
    iss: userId ? userId.toString() : '',
    exp: expDate
  }, tokenKey)
  return token
}

// 解密token身份验证
const decryToken = async (ctx, next) => {
  if (/^\/[^api]/.test(ctx.request.url)) {
    await next()
  } else {
    try {
      // 获取token
      const { query, body, headers } = ctx.request
      const token = (body && body.token) || query.token || headers['access-token'] || headers['token']
      if (!token) {
        ctx.body = svc.returnBody(1, 'token不存在')
        return
      }
      // 解密token
      const result = jwt.decode(token, tokenKey)
      if (result.exp <= Date.now()) {
        ctx.status = 401
        return
      }
      // 获取用户信息
      const userId = result.iss
      const user = await userUtil.getUserById(userId)
      if (user) {
        ctx.user = user._id
        await next()
        return
      }
      ctx.status = 401
      ctx.body = svc.returnBody(1, '用户不存在')
    } catch (err) {
      console.log(err)
      ctx.status = 401
      ctx.body = svc.returnBody(1, 'token解析失败')
    }
  }
}

module.exports = {
  decryToken,
  getToken
}