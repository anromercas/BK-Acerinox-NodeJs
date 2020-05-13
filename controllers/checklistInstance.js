const ChecklistInstance = require('../models/ChecklistInstance')
const Checklist = require('../models/Checklist')
const { subTypeEnum, statusEnum, lineTypeEnum } = require('../models/checklistInstanceEnums')

// @desc    Get all checklist instances
// @route   GET /api/v1/checklistInstances
// @access  Public
exports.getChecklistInstances = async (req, res, next) => {
  try {
    const checklistinstances = await ChecklistInstance
    .find()
    .populate([{path: 'user_id', select: 'fullname -_id'}, {path: 'checklist_id', select: 'name -_id department'}]);

    return res.status(200).json({
      success: true,
      count: checklistinstances.length,
      data: checklistinstances
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
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
    const instanceValues = { subType, user_id: auditor._id, checklist_id: checklist._id, startDate, dueDate, overdueDate, repetition };
    const _checklist = await Checklist.findById(checklist._id, 'checkpoints');
    switch (subType){
      case subTypeEnum.PUNTUAL:
        const content = _checklist.checkpoints.map(checkpoint => {
          const contentEntry = {     
            name: checkpoint.name,
            type: checkpoint.type
          };
          if (checkpoint.type === lineTypeEnum.FIXED_LINE)
            contentEntry['fixedValues'] = checkpoint.fixedTypes.map(type => {return {type: type,  value: undefined}});//TODO: check whether setting a default value for value of type "type" is of any help
          else if (checkpoint.type === lineTypeEnum.FREE_LINE)
            contentEntry['freeValues'] = [{text: "", images: []}];
          return contentEntry;
        });
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

    // if(!checklistinstance) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'No checklist found'
    //   });
    // }

    if (checklistinstance) 
      await checklistinstance.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}
// @desc      Update checklist instance´s status
// @route     PUT /api/v1/checklistInstances/:newStatus
// @access    Public
exports.updateChecklistInstanceStatus = async (req, res, next) => {
  try {
    const { status, _id } = req.body;
    const newStatus = req.params.newStatus;
    console.log("body :", JSON.stringify(req.body));
    const checklistinstance = await ChecklistInstance.findById(_id);
    checklistinstance.status = newStatus;
    console.log("new status ", newStatus);
    console.log("updated checklist: ", JSON.stringify(checklistinstance));
    await checklistinstance.save();
    
    //TODO: Move this validation to model
    // if(!checklistinstance) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'No checklist found'
    //   });
    // }

    return res.status(200).json({
      success: true,
      data: checklistinstance
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}