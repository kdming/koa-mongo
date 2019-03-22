const jwt = require('jwt-simple');
const moment = require('moment');

const mongodb = require('../../controller/mongo/mongo');
const svc = require('../../controller/util/service');
const config = require('../config');

const tokenKey = config.parsed.tokenKey;

const getToken = async (user) => {
  const expDate = moment().add(30, 'minute').valueOf();
  const token = await jwt.encode({
    iss: user.id,
    exp: expDate
  }, tokenKey);
  return token;
}

const decryToken = async (ctx, next) => {
  if (/^\/[^api]/.test(ctx.request.url)) {
    await next();
  } else {
    const { query, body, headers } = ctx.request;
    const token = (body && body.token) || query.token || headers['access-token'] || headers['token'];
    if (!token) {
      ctx.body = svc.returnBody(false, {}, 'token不存在');
      return;
    }
    try {
      const decoded = jwt.decode(token, tokenKey);
      if (decoded.exp <= Date.now()) {
        ctx.status = 401;
        return;
      }
      const userId = decoded.iss;
      const where = {_id: svc.objId(userId)};
      const user = await mongodb.find({model: 'user', where});
      if (user[0]) {
        ctx.user = user[0]._id;
        await next();
        return;
      }
      ctx.status = 401;
      ctx.body = svc.returnBody(false, {}, '用户不存在');
    } catch (err) {
      console.log(err);
      ctx.status = 401;
      ctx.body = svc.returnBody(false, {}, 'token解析失败');
    }
  }
}

module.exports = {
  decryToken,
  getToken
}