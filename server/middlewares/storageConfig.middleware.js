const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const storage = (filepath) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, filepath);
        },
        filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname))
    });
}


const upload = (storagefilepath) => multer({ storage: storage(storagefilepath) });



module.exports = {
    upload,
}