const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  metadata: {
    parentResourceId: { type: String },
  },
});

const LogMongoDB = mongoose.model('Log', logSchema);

module.exports = LogMongoDB;
