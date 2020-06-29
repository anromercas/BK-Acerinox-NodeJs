const Checklist = require('../models/Checklist');

// @desc    Get all checklist instances
// @route   GET /api/v1/checklists
// @access  Public
exports.getChecklists = async (req, res, next) => {
  try {
    const checklists = await Checklist.find({}, 'name description type department maxOverdueDays');

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
    const { name, type, description, department, content } = req.body;
    const aNewChlst = {
      name, type, description, department, content
    }
    const checklist = await Checklist.create(aNewChlst);
  
    return res.status(201).json({
      success: true,
      data: checklist
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

// @desc    update checklist
// @route   PUT /api/v1/checklists
// @access  Public
exports.updateChecklist = async (req, res, next) => {
  try {

    const options = {
      new: true,
      runValidators: true,
      context: 'query'
    };

    const checklist = await Checklist.findByIdAndUpdate(req.params.id, req.body, options);
  
    return res.status(201).json({
      success: true,
      data: checklist
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

// @desc    Delete checklist (it does not delete in cascade)
// @route   DELETE /api/v1/checklists/:id
// @access  Public
exports.deleteChecklist = async (req, res, next) => {
  try {
    const checklist = await Checklist.findById(req.params.id);

    // if(!checklist) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'No task found'
    //   });
    // }
    if (checklist)
      await checklist.remove();
    else 
      console.log('it was not present!');
      
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