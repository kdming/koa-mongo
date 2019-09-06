// 路由管理
const koaRouter = require('koa-router')
const path = require('path')
const glob = require('glob')

// 定义连个路由，一个token验证一个不验证
const root = new koaRouter({ prefix: '/api' })
const unroot = new koaRouter({ prefix: '/api' })

// 加载路由
const loadRouter = () => {
  try {
    // 获取路由文件列表
    const filePath = path.join(`${__dirname}/../../controller`)
    let defines = glob.sync('*/*controller.js', {
      root: 'controller',
      cwd: filePath
    })
    // 加载路由
    for (let v in defines) {
      const controller = require(`${filePath}/${defines[v]}`)
      controller.router(root, unroot)
    }
    console.log('路由列表', defines)
    return { root, unroot }
  } catch (err) {
    console.log(err)
  }
}

module.exports.loadRouter = loadRouter