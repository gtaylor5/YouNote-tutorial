const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  usename: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  numNotes: {
    type: Number
  }
});

module.exports = User = mongoose.model('User', UserSchema);