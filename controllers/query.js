
const ChecklistInstance = require('../models/ChecklistInstance');
const Auditor = require('../models/User');

// @desc    Get latest checklist instances
// @route   GET /api/v1/latests/:quantity
// @access  Public
exports.getLatest = async (req, res, next) => {
  try {
    const quantity = req.params.quantity;
    
    console.log("getLatest " + quantity);
    //const tasks = [{"_id": "5e891d5fc9f690e83aef6577", "name": "OPS Revisar Puertas Pabellón #1", "type": 'PUNTUAL', "auditor": "Manolo" , "dueDate": new Date(Date.now()).toLocaleString()}];
    
    const checklists = await ChecklistInstance.find().sort({ createdAt: 'desc' }).limit(Number(quantity));
    
    console.log("find.sort.limit checklist instances " + checklists.length);
    
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

// @desc    Get all audiros
// @route   GET /api/v1/queries/auditors
// @access  Public
exports.getAuditors = async (req, res, next) => {
  try {
    const auditors = await Auditor.find({role: 'AUDITOR', active: true});

    return res.status(200).json({
      success: true,
      count: auditors.length,
      data: auditors
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}