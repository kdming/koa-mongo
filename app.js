const koaStatic = require('koa-static')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const koaCors = require('@koa/cors')
const koa = require('koa')

const dbModel = require('./src/common/mongo/model')
const router = require('./src/common/router')
const mongodb = require('./src/common/mongo')
const config = require('./src/common/config')
const token = require('./src/common/token')

const app = new koa()

// 静态资源
app.use(koaStatic('static'))

// log打印
app.use(koaLogger())

// 表单解析
app.use(koaBody())

// 跨域配置
const options = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  allowHeaders: ['Content-Type', 'accept', 'access-token', 'X-CLOUD-TOKEN', 'token', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'],
}
app.use(koaCors(options))

// 路由配置
const { root, unroot } = router.loadRouter()
app.use(unroot.routes())
app.use(async (ctx, next) => {
  await token.decryToken(ctx, next)
})
app.use(root.routes())

// 加载mongodb启动项目
mongodb.connect().on('connected', () => {
  dbModel.loadModel()
  const appPort = config.parsed.appPort
  app.listen(appPort)
  console.log('项目启动', appPort)
})