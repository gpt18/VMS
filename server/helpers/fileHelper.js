const {v2: cloudinary} = require('cloudinary');
const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } 
    })
}

const uploadToCloudinary = async (file) => {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
};

module.exports = {
    uploadToCloudinary,
    deleteFile,
}