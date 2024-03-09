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

const deleteFromCloudinary = async (secureUrls) => {
    try {
        if (!Array.isArray(secureUrls)) {
            secureUrls = [secureUrls];
        }
       
        for (let url of secureUrls) {
           
            let publicId = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
            let response = await cloudinary.uploader.destroy(publicId);
            
        }
    } catch (error) {
        console.error('Failed to delete images:', error);
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFile,
    deleteFromCloudinary
}