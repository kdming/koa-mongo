
// 测试
const helloWrold = async (ctx) => {
  try {
    ctx.body = ctx.returnBody(true, 'hello Wrold', '获取成功');
  } catch (err) {
    console.log(err);
  }
}

module.exports.router = (router) => {
  router.get('/test', helloWrold);
}