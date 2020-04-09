const mongoose = require('mongoose');

const checklistInstanceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A user for this checklist´s instance is required']
  },
  checklist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: [true, 'A checklist for this checklist´s instance is required']
  },
  status: {
    type: String,
    enum: ['ASSIGNED', 'REVIEW-PENDING', 'REVIEWED'],
    default: 'ASSIGNED'
  },
  subType: {
    type: String,
    enum: ['PUNTUAL', 'PUNTUAL-ALEATORIA', 'PUNTUAL-SEMANAL', 'PUNTUAL-MENSUAL', 'SEMANAL', 'MENSUAL'],
    default: 'PUNTUAL'
  },
  startDate: Date,
  dueDate: Date,
  overdueDate: Date,
  shift: String,
  lineSupervisor: {
    type: String,
    default: 'not informed yet'
  },
  signingDate: Date,
  signingInfo: String,
  content: [{
    name: String,
    type: {
      type: String,
      enum: ['FREE_LINE', 'FIXED_LINE'],
      default: 'FREE_LINE'
    },
    freeValues: [{
      images: [String],
      text: String
    }],
    fixedValues: [{
      type: String, //this refers to the type of the value (i.e: {type: boolean, value: "3"})
      value: String
    }]
  }]
}, {timestamps: true});

module.exports = mongoose.model('ChecklistInstance', checklistInstanceSchema);