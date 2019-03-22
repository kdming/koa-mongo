const mongoose = require('mongoose');
mongoose.set('debug', true);

/**
 * 单个查询
 * @param {Object} params 查询参数列表 model, where, option
 */
const find = async (params) => {
  try {
    const {model, where, option} = params;
    const Model = mongoose.model(model);
    const result = await Model.find(where, option);
    return result;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 分页查询
 * @param {Object} params 分页查询参数 model, where, page, limit
 */
const findByPage = async (params) => {
  try {
    const {model, where, page, limit} = params;
    const Model = mongoose.model(model);
    const result = await Model.paginate(
      where,
      {
        page: page >> 0,
        limit: limit >> 0
      }
    );
    return result;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 创建数据
 * @param {Object} params 待创建的数据 model, data
 */
const create = async (params) => {
  try {
    const {model, data} = params;
    const Model = mongoose.model(model);
    const result = await Model.create(data);
    return result;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 更新数据
 * @param {Object} params 更新参数  where, model, update, option
 */
const update = async (params) => {
  try {
    const {where, model, update} = params;
    const Model = mongoose.model(model);
    const result = await Model.update(where, {$set: update});
    return result;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 删除条件
 * @param {Object} params 删除数据 model, where
 */
const del = async (params) => {
  try {
    const {model, where} = params;
    const Model = mongoose.model(model);
    const result = await Model.deleteMany(where);
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  find,
  findByPage,
  create,
  update,
  del
}