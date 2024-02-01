const httpStatus = require("http-status")

function handleFileUploadForNgo (req, res) {
    console.log(req.file)
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/ngo/${req.file.filename}`
    return res.status(httpStatus.CREATED).json({
        file: req.file.filename,
        url: fileUrl
    })
}

module.exports = {
    handleFileUploadForNgo,
}