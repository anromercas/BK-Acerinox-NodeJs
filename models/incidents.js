const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A user for this checklist´s instance is required']
  },
  date: Date,
  department: String,
  location: String,
  category: {
    type: String,
    enum: []//categorías
  },
  signingDate: Date,
  signingInfo: String,
  content: [{
    freeValues: [{
      images: [String],
      name: String,
      description: String
    }]
  }]
},{
    timestamps: true,
    toJSON: {virtuals: true}
  }
);

module.exports = mongoose.model('Incidents', incidentSchema);