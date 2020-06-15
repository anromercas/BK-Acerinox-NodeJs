const Incident = require('../models/incidents');
const { deleteFile } = require('./upload');


// @desc    Get all incidents
// @route   GET /api/v1/incident
// @access  Public
exports.getIncidents = async (req, res, next) => {
    try {
      const incidents = await Incident      
      .find();

      return res.status(200).json({
        success: true,
        count: incidents.length,
        data: incidents
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error. Couldn´t get the checklist instances'
      });
    }
  }

// @desc    Add incident
// @route   POST /api/v1/incident
// @access  Public
exports.addIncident = async (req, res, next) => {
    try {
      
      const incident = await Incident.create(req.body);
    
      return res.status(201).json({
        success: true,
        data: incident
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

// @desc    Update incident
// @route   PUT /api/v1/incident/:id
// @access  Public
exports.updateIncident = async (req, res, next) => {

  try {
    // console.log(req.body);
    const options = {
      new: true,
      runValidators: true,
      context: 'query'
    };
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, options);
  
    return res.status(201).json({
      success: true,
      data: incident
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

// @desc    Delete Incident
// @route   DELETE /api/v1/incident/:id
// @access  Public
exports.deleteIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (incident) {
      // mando a borrar las imgs
      if(incident.content[0].freeValues.length > 0) {
        let freeValues = incident.content[0].freeValues;
            freeValues.forEach( value => {
              value.images.forEach( img => {
                deleteFile(img, 'incident');
              });
          });
      }      
      
      await incident.remove();

    }

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t delete Incident'
    });
  }
}