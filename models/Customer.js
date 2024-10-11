const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true
  },
  interest: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Customer', customerSchema);
