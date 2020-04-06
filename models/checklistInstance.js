const mongoose = require('mongoose');

const checklistInstanceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'A user for this checklist´s instance is required']
  },
  checklist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checklist',
    required: [true, 'A checklist for this checklist´s instance is required']
  },
  status: {
    type: String,
    enum: ['ASSIGNED', 'DONE', 'REVIEW-PENDING', 'REVIEWED'],
    default: 'ASSIGNED'
  },
  type: {
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
    checkpointName: String,
    lines: [{
              images: [String],
              text: String
            }]
  }]
}, {timestamps: true});

module.exports = mongoose.model('ChecklistInstance', checklistInstanceSchema);