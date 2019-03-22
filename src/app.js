const convert = require('koa-convert');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const koa = require('koa');

const loadRouter = require('./common/router/controller');
const connect = require('./common/mongo/mongo');
const token = require('./common/token/token');
const config = require('./common/config');

const app = new koa();
app.use(koaBody());

app.use(convert(cors({
  origin: '*',
  credentials: true,
  headers: ['Content-Type', 'accept', 'access-token', 'X-CLOUD-TOKEN', 'token', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'],
  expose: ['Total', 'X-Response-Time', 'Content-Disposition']
})));

const {router, unroot} = loadRouter();
app.use(unroot.routes())
app.use(async (ctx, next) => {
  await token.decryToken(ctx, next)
});
app.use(router.routes());

connect().on('connected', () => {
  const appPort = config.parsed.appPort;
  app.listen(appPort);
  console.log('项目启动', appPort);
})