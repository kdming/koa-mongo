const mongoose = require('mongoose')
const crypto = require('crypto')

const service = {
  // 接口返回参数格式化
  returnBody: (code, data, message = null) => {
    if (code === 1) {
      console.log(data, message)
    }
    if (code === 1 && message == null) {
      message = data
      data = null
    } 
    return { code, data, message }
  },
  // md5加密字符串
  encryptStr: (str) => {
    if (!str || typeof str !== 'string') return str
    const encryptStr = crypto.createHash('md5').update(str).digest('hex')
    return encryptStr
  },
  // objectId转换
  objId: (id) => {
    return mongoose.Types.ObjectId(id)
  }
}

module.exports = service