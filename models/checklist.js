const mongoose = require('mongoose');
const { typeEnum, typeEnumDefault, lineTypeEnum, lineTypeEnumDefault} = require('./enums/checklistEnums');

const ChecklistSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.keys(typeEnum),
    default: typeEnumDefault
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
  content: [
    {
      section: String,
      checkpoints: [{
        name: String,
        type: {
          type: String,
          enum: Object.keys(lineTypeEnum),
          default: lineTypeEnumDefault
        }  
      }]
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model('Checklist', ChecklistSchema);