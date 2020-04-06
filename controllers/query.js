const opsInstance = require('../models/opsInstance');
const checklistInstance = require('../models/checklistInstance');
const Auditor = require('../models/user');

// @desc    Get latest ops and checklist instances
// @route   GET /api/v1/latests/:quantity
// @access  Public
exports.getLatest = async (req, res, next) => {
  try {
    const quantity = req.params.quantity;
    console.log("getLatest " + quantity);
    //const tasks = [{"_id": "5e891d5fc9f690e83aef6577", "name": "OPS Revisar Puertas Pabellón #1", "type": 'PUNTUAL', "auditor": "Manolo" , "dueDate": new Date(Date.now()).toLocaleString()}];
    const opss = await opsInstance.find().sort({ 'createdAt': 'desc' }).limit(Number(quantity));
    console.log("find.sort.limit ops instances " + opss.length);
    const checklists = await checklistInstance.find().sort({ createdAt: 'desc' }).limit(Number(quantity));
    console.log("find.sort.limit checklist instances " + checklists.length);
    let tasks = opss.concat(checklists).sort((a,b) => a.createdAt > b.createdAt).slice(0, quantity);//sort and pick up the "quantity" firsts
    console.log("aggregate tasks " + tasks.length);
    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
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
    const auditors = await Auditor.find();

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