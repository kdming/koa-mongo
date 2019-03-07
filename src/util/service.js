const service = async (ctx, next) => {
  ctx.returnBody = (success, data, message) => {
    return {success, data, message};
  };
  await next();
}
module.exports = service;