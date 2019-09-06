
const mongoose = require('mongoose');

const {getToken} = require('../../common/token/token');
const svc = require('../util/service');

const register = async (ctx) => {
  try {
    const User = mongoose.model('user');
    await User.create(ctx.request.body);
    ctx.body = svc.returnBody(0, {}, '注册成功');
  } catch (err) {
    ctx.body = svc.returnBody(1, err, '注册失败');
  }
}

const login = async (ctx) => {
  try {
    const {name, pwd} = ctx.request.body;
    const User = mongoose.model('user');
    const user = await User.findOne({name: name, pwd: svc.encryptStr(pwd)});
    if (user) {
      const token = await getToken(user);
      ctx.body = svc.returnBody(0, {token}, '登录成功');
      return;
    }
    ctx.body = svc.returnBody(1, {}, '用户不存在');
  } catch (err) {
    ctx.body = svc.returnBody(1, err, '登录失败');
  }
}

module.exports.router = (router, unroot) => {
  unroot.post('/user/login', login);
  unroot.post('/user/register', register);
}