const timestamps = require('mongoose-timestamp');
const pagination = require('mongoose-paginate');
const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');

pagination.paginate.options = {
  lean: true,
  limit: 20
}

const loadModel = () => {
  // 获取model文件列表
  const filePath = path.join(`${__dirname}/../../model`)
  const defines = glob.sync('*.js', {
    root: 'model',
    cwd: filePath
  });
  // model注册到mongoose
  defines.forEach(function (define) {
    const mongo = require(`${filePath}/${define}`);
    const {name, model} = mongo(mongoose.Schema);
    model.plugin(pagination);
    model.plugin(timestamps);
    model.set('toJSON', {
      versionKey: false,
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    });
    mongoose.model(name, model);
  });
  console.log('model列表', defines);
}

module.exports = loadModel;