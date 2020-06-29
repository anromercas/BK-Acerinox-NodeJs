const fs = require('fs');
const path = require('path');


exports.getImg = async (req, res, next) => {

    let type = req.params.type;
    let img = req.params.img;

    let pathImage = path.resolve(__dirname, `../uploads/${ type }/${ img }`);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }

}