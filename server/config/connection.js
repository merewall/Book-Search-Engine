// BRING IN MONGOOSE MODULE AND ENVIRONMENT VARIABLES
const mongoose = require('mongoose');
require('dotenv').config()

// CONNECT TO MONGOOSE DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
