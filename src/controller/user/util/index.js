const mongoose = require('mongoose')

const svc = require('../../util/service')

// 1.根据用户id获取用户信息
const getUserById = async (userId) => {
  try {
    const User = await mongoose.model('user')
    const user = await User.findOne({_id: svc.objId(userId)})
    return user
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  getUserById
}