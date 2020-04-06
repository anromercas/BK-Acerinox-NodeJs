const OpsInstance = require('../models/opsInstance');

// @desc    Get all ops instances
// @route   GET /api/v1/opsInstances
// @access  Public
exports.getOPSInstances = async (req, res, next) => {
  try {
    const opsinstances = await OpsInstance.find();

    return res.status(200).json({
      success: true,
      count: opsinstances.length,
      data: opsinstances
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add ops instance
// @route   POST /api/v1/opsinstances
// @access  Public
exports.addOPSInstance = async (req, res, next) => {
  try {
    const { name, type, auditor_id, ops_id} = req.body;
    const opsinstance = OpsInstance.create({ name, type, assignee: auditor_id, ops_id });
    
    return res.status(201).json({
      success: true,
      data: opsinstance
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
// @route   DELETE /api/v1/opsInstances/:id
// @access  Public
exports.deleteOPSInstance = async (req, res, next) => {
  try {
    const ops_instance = await OpsInstance.findById(req.params.id);

    // if(!ops_instance) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'No ops instance found'
    //   });
    // }

    if (ops_instance)
      await ops_instance.remove();

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