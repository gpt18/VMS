const multer = require('multer');
const { nanoid  } = require('nanoid');
const path = require('path');

const customFileName = (req, file, cb) => {
    const now = Date.now();
    return cb(null, nanoid(4)+ '_' + now + path.extname(file.originalname));
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: customFileName
});

const upload =  multer({ storage });

// const upload = multer({ dest: 'uploads/', filename: customFileName});

module.exports = {
    upload,
};