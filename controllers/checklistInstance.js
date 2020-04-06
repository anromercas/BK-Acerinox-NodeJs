const ChecklistInstance = require('../models/checklistInstance');

// @desc    Get all checklist instances
// @route   GET /api/v1/checklistInstances
// @access  Public
exports.getChecklistInstances = async (req, res, next) => {
  try {
    const checklistinstances = await ChecklistInstance.find();

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
    const { name, type, auditor_id, checklist_id} = req.body;
    const checklistinstance = ChecklistInstance.create({ name, type, assignee: auditor_id, ops_id });
    
    return res.status(201).json({
      success: true,
      data: checklistinstance
    }); 
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

// @desc    Delete ops instance
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