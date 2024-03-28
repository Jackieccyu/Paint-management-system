const mongoose = require('mongoose');

// First, we need to define a schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['John', 'Jane', 'Painter', 'Adam'],
    required: true
  },
  view: {
    type: Boolean,
    required: true
  },
  update: {
    type: Boolean,
    required: true
  },
  permissionedit: {
    type: Boolean,
    required: true
  }
});


module.exports = mongoose.model('User', userSchema);