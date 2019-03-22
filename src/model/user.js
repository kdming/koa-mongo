const crypto = require('crypto');

module.exports = (Schema) => {
  const model = new Schema({
    name: String,
    pwd: String
  });
  model.pre('save', function (next) {
    this.pwd = crypto.createHash('sha1').update(this.pwd).digest('hex');
    next();
  });
  return {name: 'user', model};
}