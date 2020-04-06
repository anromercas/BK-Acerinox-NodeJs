const Checklist = require('../models/checklist');

// @desc    Get all checklist instances
// @route   GET /api/v1/checklists
// @access  Public
exports.getChecklists = async (req, res, next) => {
  try {
    const checklists = await Checklist.find();

    return res.status(200).json({
      success: true,
      count: checklists.length,
      data: checklists
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add checklist
// @route   POST /api/v1/checklists
// @access  Public
exports.addChecklist = async (req, res, next) => {
  try {
    const { name, type, checkPointNames } = req.body;

    const task = await Checklist.create(req.body);
  
    return res.status(201).json({
      success: true,
      data: task
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

// @desc    Delete checklist
// @route   DELETE /api/v1/checklists/:id
// @access  Public
exports.deleteChecklist = async (req, res, next) => {
  try {
    const checklist = await Checklist.findById(req.params.id);

    if(!checklist) {
      return res.status(404).json({
        success: false,
        error: 'No task found'
      });
    }

    await checklist.remove();

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