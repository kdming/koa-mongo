const svc = require('../controller/util/service')

module.exports = (Schema) => {
  const model = new Schema({
    name: String,
    password: String
  })
  model.pre('save', function (next) {
    this.password = svc.encryptStr(this.password)
    next()
  })
  return { name: 'user', model }
}