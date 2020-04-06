const mongoose = require('mongoose');

const OPSSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A name for this ops´s name is required']
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

module.exports = mongoose.model('ops', OPSSchema)
