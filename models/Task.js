const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  type: {
    type: String,
    required: [true, 'Please add a positive or negative number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);