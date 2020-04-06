const Ops = require('../models/ops');

// @desc    Get all OPSs
// @route   GET /api/v1/opss
// @access  Public
exports.getOpss = async (req, res, next) => {
  try {
    const opss = await Ops.find();

    return res.status(200).json({
      success: true,
      count: opss.length,
      data: opss
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}
// @desc    Add Ops
// @route   POST /api/v1/opss
// @access  Public
exports.addOPS = async (req, res, next) => {
  try {
    const { name, type, checkPointNames } = req.body;

    const ops = await Ops.create(req.body);
  
    return res.status(201).json({
      success: true,
      data: ops
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