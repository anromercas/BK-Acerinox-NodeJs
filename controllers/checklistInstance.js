const { ChecklistInstance, validateStatus } = require('../models/ChecklistInstance')
const Checklist = require('../models/Checklist')
const { subTypeEnum, statusEnum, lineTypeEnum } = require('../models/enums/checklistInstanceEnums')
require ('../utils/typeExtension');
const { deleteFile } = require('./upload');

// @desc    Get all checklist instances
// @route   GET /api/v1/checklistInstances
// @access  Public
exports.getChecklistInstances = async (req, res, next) => {
  try {
    const type = req.params.type;
    const checklistinstances = await ChecklistInstance
    .find()
    .populate([{path: 'user_id', select: 'fullname -_id'}, {path: 'checklist_id', select: 'type name -_id department'}]);
    return res.status(200).json({
      success: true,
      count: checklistinstances.length,
      data: checklistinstances
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t get the checklist instances'
    });
  }
}


// @desc    Get checklist instance by id
// @route   GET /api/v1/checklistInstances
// @access  Public
exports.getChecklistInstanceById = async (req, res, next) => {

  try {
    const chkInstance = await ChecklistInstance.findById(req.params.id)
                        .populate('checklist_id')
                        .populate('user_id');

  return res.status(200).json({
    success: true,
    data: chkInstance
  });
} catch (err) {
  return res.status(500).json({
    success: false,
    error: 'Server Error'
  });
}

}

// @desc    Get checklist instance by token
// @route   GET /api/v1/checklistInstances
// @access  Public
exports.getChecklistInstancesByUser = async (req, res, next) => {

  try {

    const user = req.user;

    const checklistInstances = await ChecklistInstance.find({ user_id: user._id })
                                .populate('user_id')
                                .populate('checklist_id')

    return res.status(201).json({
      success: true,
      data: checklistInstances
    }); 

  } catch(err) {
    console.log(err);
      if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
  
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
  }

}

// @desc    Add checklist instance
// @route   POST /api/v1/checklistInstances
// @access  Public
exports.addChecklistInstance = async (req, res, next) => {
  try {
    
    const { 
      auditor,
      checklist,
      subType,
      startDate,
      dueDate,
      overdueDate,
      repetition,
    } = req.body;
    const instanceValues = { subType, user_id: auditor._id, checklist_id: checklist._id, startDate, dueDate, overdueDate, shift: '--', comments: []};
    const _checklist = await Checklist.findById(checklist._id, 'content');
    switch (subType){
      case subTypeEnum.PUNTUAL:

        const content = _checklist.content.map(section => {
          const contentEntry = {
            section: section.section,
            checkpoints: section.checkpoints.map(checkpoint => {
              const checkpointEntry = {
                checked: false,
                name: checkpoint.name,
                score: 0,
                type: checkpoint.type,
                observations: []
              }
              return checkpointEntry
            })
          }
          return contentEntry;
        })
        const aNewChklInst = {...instanceValues, content};
        const newChecklistInstance = await ChecklistInstance.create(aNewChklInst);
        const filledNewChkInstance = await ChecklistInstance.findById(newChecklistInstance._id).populate([{path: 'checklist_id', select: 'name department'}, {path: 'user_id', select: 'fullname'}]);
        console.log("** newChecklistInstance " + JSON.stringify(filledNewChkInstance));
       
        //console.log("filledNewChkInstance " + JSON.stringify(filledNewChkInstance));
        return res.status(201).json({
          success: true,
          data: filledNewChkInstance
        }); 
        break;
        default:
          console.log('Rest of the subtype cases not implemented yet');
          return res.status(404).json({
            success: false,
            data: []
          }); 
          break;
    }
    
  } catch (err) {
    console.log(err);
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error. Couldn´t add a new checklist instance'
      });
    }
  }
}

// @desc    Update checklist instance
// @route   PUT /api/v1/checklistInstances/:id
// @access  Public
exports.updateChecklistInstance = async (req, res, next) => {

  try {
    console.log(req.body);
    const options = {
      new: true,
      runValidators: true,
      context: 'query'
    };
    const chkInstance = await ChecklistInstance.findByIdAndUpdate(req.params.id, req.body, options);
  
    return res.status(201).json({
      success: true,
      data: chkInstance
    }); 
  } catch (err) {
      console.log(err);
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }

}

// @desc    Delete checklist instance
// @route   DELETE /api/v1/checklistInstances/:id
// @access  Public
exports.deleteChecklistInstance = async (req, res, next) => {
  try {
    const checklistinstance = await ChecklistInstance.findById(req.params.id);

    if (checklistinstance) {
      // mando a borrar las imgs
      if(checklistinstance.content.length > 0) {
        checklistinstance.content.forEach( content => {
          content.freeValues.forEach( value => {
                value.images.forEach( img => {
                  deleteFile(img, 'checklistInstance-content');
                });
            });
        });
      }      
      
      await checklistinstance.remove();

    }

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t delete checklist instance'
    });
  }
}
// @desc      Update checklist instance´s status with comments [optional]
// @route     PUT /api/v1/checklistInstances/:newStatus
// @access    Public
exports.updateChecklistInstanceStatus = async (req, res, next) => {
  try {
    const { status, _id, comments } = req.body;
    const newStatus = req.params.newStatus;
    const extension = req.params.extension;
    console.log("body :", JSON.stringify(req.body));
    const checklistinstance = await ChecklistInstance.findById(_id);

    if(!checklistinstance) {
      return res.status(404).json({
        success: false,
        error: 'No checklist found'
      });
    }
    else {
      //TODO: Move this validation logic to model
      if (validateStatus(checklistinstance.status, newStatus)) {
        console.log("validated!");
        checklistinstance.status = newStatus;
        checklistinstance.comments = comments;
        if (newStatus === statusEnum.NOK && extension){
          const extensionDays = 5;
          checklistinstance.overdueDate = checklistinstance.overdueDate.addDays(extensionDays);
        }
        console.log("updated checklist: ", JSON.stringify(checklistinstance));
        await checklistinstance.save();
        const chklistPopulated = await ChecklistInstance
        .findById(checklistinstance._id)
        .populate([{path: 'user_id', select: 'fullname -_id'}, 
                    {path: 'checklist_id', select: 'name -_id department'}]); 
        console.log("checklistInstance saved and populated: ", chklistPopulated);
        return res.status(200).json({
          success: true,
          data: chklistPopulated
        });
      }
      else {
        console.log("new status not valid from current one")
        return res.status(403).json({
          success: false,
          error: 'Change to this status is not allowed'
        });
      } 
    }    

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t update checklist: ' + err
    });
  }
}

