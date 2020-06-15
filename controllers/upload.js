const shortid = require('shortid');

const fs = require('fs');
const path = require('path');

const Checklist = require('../models/Checklist');
const { ChecklistInstance, validateStatus } = require('../models/ChecklistInstance');
const Incident = require('../models/incidents');


const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });


// @desc    Upload images
// @route   PUT /api/v1/upload
// @access  Public
exports.uploadImg = async (req, res, next) => {

    let type = req.params.type;
    let id = req.params.id;
    let contentName = req.params.contentName || "";
    let indexFreeValue = req.params.indexFreeValue || "";

    try {

        if (Object.keys(req.files).length == 0) {
            return res.status(400)
                .json({
                    success: false,
                    err:  'file empty'
                });
        }

        // Valida Tipo
    let validTypes = ['checklist-thumbnail', 'checklistInstance-content', 'incident'];
    if (validTypes.indexOf(type) < 0) {
        return res.status(400).json({
            success: false,
            err: 'Allowed types are ' + validTypes.join(', ')
        });
    }

    let img = req.files.img;
    let cutName = img.name.split('.');
    let extension = cutName[cutName.length - 1];

    let allowedExtensions = ['png', 'jpg', 'gif', 'jpeg'];

    if (allowedExtensions.indexOf(extension) < 0) {
        return res.status(400).json({
            success: false,
            err: {
                message: 'Allowed extensions are ' + extensionesValidas.join(', '),
                estension: extension
            }
        });
    }

    // change name
    let imgName = `${id}-${ shortid.generate() }.${extension}`;

    //verify path
    const pathUploads = path.resolve(__dirname, `../uploads` );
    const pathUploadsType = path.resolve(__dirname, `../uploads/${type}` );
    const exists = fs.existsSync( pathUploads );
    const existsType = fs.existsSync( pathUploadsType );

    if( !exists ) {
        fs.mkdirSync( pathUploads );
    }

    if( !existsType ) {
        fs.mkdirSync( pathUploadsType );
    }

    img.mv(`./uploads/${type}/${imgName}`, (err) => {
        if (err)
            return res.status(500).json({
                success: false,
                err
            });

        // Now, loaded image
        switch (type) {
            case 'checklist-thumbnail':
                checklistThumbnail(id, res, imgName);
                break;
            case 'checklistInstance-content':
                checklistInstanceContent(id, res, imgName, contentName, indexFreeValue);
                break;
            case 'incident':
                incident(id, res, imgName, contentName, indexFreeValue);
                break;
        }

    });

    } catch ( err ) {
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


// Functions
function checklistThumbnail(id, res, imgName) {
    Checklist.findById(id, (err, checklist) => {
        if(err) {
            deleteFile(imgName, 'checklist-thumbnail');
            return res.status(400).json({
                susccess: false,
                err
            });
        }

        if(!checklist) {
            deleteFile(imgName, 'checklist-thumbnail');
            return res.status(400).json({
                susccess: false,
                err: 'The checklist does not exist'
            });
        }

        checklist.thumbnail = imgName;

        checklist.save((err, chkSaved) => {
            res.json({
                success: true,
                checklist: chkSaved,
                img: imgName
            })
        })
    });
}

function checklistInstanceContent(id, res, imgName, contentName, indexFreeValue) {
    ChecklistInstance.findById(id, (err, checklist) => {
        if(err) {
            deleteFile(imgName, 'checklistInstance-content');
            return res.status(400).json({
                susccess: false,
                err
            });
        }

        if(!checklist) {
            deleteFile(imgName, 'checklistInstance-content');
            return res.status(400).json({
                susccess: false,
                err: 'The checklist does not exist'
            });
        }

        const content = checklist.content.find( content => content.name === contentName );
        const freeValue = content.freeValues[indexFreeValue].images.unshift(imgName);

        console.log(freeValue);


        checklist.save((err, chkSaved) => {
            res.json({
                success: true,
                checklist: chkSaved,
                img: imgName
            })
        })
    });
}

function incident(id, res, imgName, contentIndex, indexFreeValue) {
    Incident.findById(id, (err, incident) => {
        if(err) {
            deleteFile(imgName, 'incident');
            return res.status(400).json({
                susccess: false,
                err
            });
        }

        if(!incident) {
            deleteFile(imgName, 'incident');
            return res.status(400).json({
                susccess: false,
                err: 'The incident does not exist'
            });
        }

        //const content = checklist.content.find( content => content.name === content );
        const freeValue = incident.content[contentIndex].freeValues[indexFreeValue].images.unshift(imgName);

        console.log(freeValue);


        incident.save((err, incidentSaved) => {
            res.json({
                success: true,
                incident: incidentSaved,
                img: imgName
            })
        })
    });
}



exports.deleteFile = (imgName, type) => {
    let pathImagen = path.resolve(__dirname, `../uploads/${ type }/${ imgName }`);

    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}
