const mongoose = require('mongoose');
const crypto = require('crypto');

const service = {
  returnBody: (success, data, message) => {
    return {success, data, message};
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