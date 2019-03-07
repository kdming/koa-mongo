module.exports = (Schema) => {
  const model = new Schema({
    name: String,
    pwd: String
  });
  return {name: 'user', model};
}