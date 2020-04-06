const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A name for this checklist´s name is required']
  },
  description: {
    type: String,
    trim: false,
    default: ''
  },
  department: {
    type: String
  },
  checkpointNames: {
    type: [String],
    default: []
  }
}, {timestamps: true});

module.exports = mongoose.model('checklist', checklistSchema);