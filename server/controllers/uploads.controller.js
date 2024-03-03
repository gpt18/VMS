const httpStatus = require("http-status");
const path = require('path');
const fs = require('fs');

function handleFileUpload(req, res) {
    if (!req.file) {
        return res.status(400).send({ error: 'No any file is provided in the request.' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/public/file/${req.file.filename}`
    return res.status(httpStatus.CREATED).json({
        file: req.file.filename,
        url: fileUrl,
        filePath: req.file.path,
        fileType: req.file.mimetype,
    });

}

const handleFileDelete = (fileLocation) => {
    return (req, res) => {
        const fileName = req.params.fileName;
        const filePath = path.join(__dirname, '..', fileLocation, fileName);

        fs.unlink(filePath, (err) => {
            if (err) {
                //   console.error(err);
                return res.status(500).json({ error: 'Error deleting file.' });
            }

            res.status(200).json({ message: 'File removed successfully.' });
        });
    };
};

function handleFileView(req, res) {
    const filePath = path.join(__dirname, '../uploads', req.params.file);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // console.error('File does not exist');
            return res.status(404).send('File not found');
        } else {
            return res.sendFile(filePath);
        }
    });
}


module.exports = {
    handleFileUpload,
    handleFileDelete,
    handleFileView,
}