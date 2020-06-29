const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A user for this incident is required']
  },
  date: Date,
  department: String,
  location: String,
  insecureActs: String,
  insecureConditions: String,
  signingDate: Date,
  signingInfo: String,
  images: [String]
},{
    timestamps: true,
    toJSON: {virtuals: true}
  }
);

module.exports = mongoose.model('Incidents', incidentSchema);