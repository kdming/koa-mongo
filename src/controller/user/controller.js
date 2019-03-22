
const {getToken} = require('../../common/token/token');
const mongo = require('../mongo/mongo');
const svc = require('../util/service');

const register = async (ctx) => {
  try {
    const {name, pwd} = ctx.request.body;
    const params = {
      model: 'user',
      data: {name, pwd}
    }
    const result = await mongo.create(params);
    if (result) {
      ctx.body = svc.returnBody(true, {}, '注册成功');
    }
  } catch (err) {
    console.log(err);
    ctx.body = svc.returnBody(false, {}, '注册失败');
  }
}

const login = async (ctx) => {
  try {
    const {name, pwd} = ctx.request.body;
    const params = {
      model: 'user',
      where: {name: name, pwd: svc.encryptStr(pwd)}
    };
    const user = await mongo.find(params);
    if (user[0]) {
      const token = await getToken(user);
      ctx.body = svc.returnBody(true, {token}, '登录成功');
      return;
    }
  } catch (err) {
    console.log(err);
    ctx.body = svc.returnBody(false, {}, '登录失败');
  }
}

module.exports.router = (router, unroot) => {
  unroot.post('/user/login', login);
  unroot.post('/user/register', register);
}