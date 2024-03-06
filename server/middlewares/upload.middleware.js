const multer = require('multer');
const { nanoid  } = require('nanoid');
const path = require('path');

const customFileName = (req, file, cb) => {
    const now = Date.now();
    return cb(null, nanoid(4)+ '_' + now + path.extname(file.originalname));
}

const upload = multer({ dest: 'uploads/', filename: customFileName});

module.exports = {
    upload,
};