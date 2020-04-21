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
  thumbnail: String,
  maxOverdueDays: Number,
  checkpoints: [{
    name: String,
    type: {
      type: String,
      enum: ['FREE_LINE', 'FIXED_LINE'],
      default: 'FREE_LINE'
    },
    fixedTypes: [String] //this refers to the type of the values (i.e: [boolean, Date, String...])  
  }]
}, {timestamps: true});

module.exports = mongoose.model('Checklist', ChecklistSchema);