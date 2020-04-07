const mongoose = require('mongoose');

const ChecklistSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['CHECKLIST', 'OPS'],
    default: 'CHECKLIST'
  },
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
  checkpoints: [{
    type: {
      type: String,
      enum: ['INPUT_LINES', 'FIXED_VALUES'],
      default: 'INPUT_LINES'
    },
    name: String
  }]
}, {timestamps: true});

module.exports = mongoose.model('Checklist', ChecklistSchema);