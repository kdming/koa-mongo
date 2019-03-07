const koaBody = require('koa-body');
const koa = require('koa');

const router = require('./common/router/controller');
const mongo = require('./common/mongo/mongo');
const svc = require('../src/util/service');
const config = require('./common/config');

const app = new koa();
app.use(koaBody());

mongo.on('connected', () => {
  app.use((ctx, next) => {svc(ctx, next)});
  app.use(router.routes());
  const appPort = config.parsed.appPort;
  app.listen(appPort);
  console.log('项目启动', appPort);
})