// mongodb model加载
const timestamps = require('mongoose-timestamp')
const pagination = require('mongoose-paginate')
const mongoose = require('mongoose')
const path = require('path')
const glob = require('glob')

// 分页参数
pagination.paginate.options = {
  lean: true,
  limit: 20
}

// 加载model
const loadModel = () => {
  // 获取model文件列表
  const filePath = path.join(`${__dirname}/../../model`)
  const defines = glob.sync('*.js', {
    root: 'model',
    cwd: filePath
  })
  // model注册
  defines.forEach((define) => {
    const mongo = require(`${filePath}/${define}`)
    const { name, model } = mongo(mongoose.Schema)
    if (!name || !model) return
    model.plugin(pagination)
    model.plugin(timestamps)
    model.set('toJSON', {
      versionKey: false,
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    })
    mongoose.model(name, model)
  })
  console.log('model列表', defines)
}

module.exports.loadModel = loadModel