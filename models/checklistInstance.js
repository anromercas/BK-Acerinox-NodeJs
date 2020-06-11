const mongoose = require('mongoose');
const { statusEnum, statusEnumDefault, subTypeEnum, subTypeEnumDefault, lineTypeEnum, lineTypeEnumDefault} = require('./enums/checklistInstanceEnums');

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
    enum: Object.keys(statusEnum),
    default: statusEnumDefault
  },
  subType: {
    type: String,
    enum: Object.keys(subTypeEnum),
    default: subTypeEnumDefault
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
    score: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5]
    },
    type: {
      type: String,
      enum: Object.keys(lineTypeEnum),
      default: lineTypeEnum.FREE_LINE
    },
    freeValues: [{
      images: [String],
      text: String
    }],
    fixedValues: [{
      _type: String, //this refers to the type of the value (i.e: {type: boolean, value: "3"})
      _value: String
    }]
  }],
  comments: [String]
},{
    timestamps: true,
    toJSON: {virtuals: true}
  }
);
// checklistInstanceSchema.virtual('checklistName', {
//   ref: 'Checklist',
//   foreignField: '_id',
//   localField: 'checklist_id',
//   justOne: true,
//   options: {select: 'name'}
// });
exports.validateStatus = (currentStatus, newStatus) => {
  let result = false;
  //TODO: Improve this! ****ing javascript
  const ASIGNADA = statusEnum.ASIGNADA;
  const A_REVISAR = statusEnum.A_REVISAR;
  const OK = statusEnum.OK;
  const NOK = statusEnum.NOK;

  const validNextStatus = {
    'ASIGNADA': [A_REVISAR],
    'A_REVISAR': [OK, NOK],
    'NOK': [A_REVISAR],
    'OK': []
  };
  return validNextStatus[currentStatus].includes(newStatus);
};
exports.ChecklistInstance = mongoose.model('ChecklistInstance', checklistInstanceSchema);