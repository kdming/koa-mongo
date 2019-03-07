const mongoose = require('mongoose');

const config = require('../config');
const model = require('./model');

let limit = 5;
let error = 0;

const connect = () => {  
  try {
    mongoose.connect(config.parsed.mongoUrl, {useNewUrlParser: true});
  } catch (err) {
    console.log(err);
  }
}

mongoose.connection.on('connected', () => {
  model();
});

mongoose.connection.on('disconnection', () => {
  if (error < limit) connect();
  error += 1;
})

mongoose.connection.on('error', (err) => {
  if (error < limit) connect();
  console.log(err);
})

connect();
module.exports = mongoose.connection;