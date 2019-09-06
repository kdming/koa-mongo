const mongoose = require('mongoose');
const crypto = require('crypto');

const service = {
  returnBody: (code, data, message) => {
    if (code === 1) {
      console.log(data); // 输出异常信息
    } 
    return {code, data, message};
  },
  encryptStr: (str) => {
    if (!str || typeof str !== 'string') return str;
    const estr = crypto.createHash('sha1').update(str).digest('hex');
    return estr;
  },
  objId: (id) => {
    return mongoose.Types.ObjectId(id);
  }
}
module.exports = service;