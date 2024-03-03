const express = require("express");
const { 
    handleGetNgoDetails, 
    handleRegisterNewNgo, 
    handleGetRegisterStatus, 
    handleAddNewVolunteer, 
    handleGetAllAssociatedVols, 
    handleGetOneVol
 } = require("../controllers/ngo.controller");
const { handleGetUserDetails } = require("../controllers/user.controller");
const { handleFileUploadForNgo, handleFileUpload, handleFileDelete } = require("../controllers/uploads.controller");
const { upload, deleteFile, checkScope } = require("../middlewares/storageConfig.middleware");

const router = express.Router();

// app.use("/api/ngo", addPayload, restrictToNgo, ngoRouter); //reference


router.post('/upload', upload('./uploads').single('file'), handleFileUpload);

router.delete('/file/:fileName', handleFileDelete('./uploads'));

// router.post('/upload', checkScope, upload('./uploads/ngo').single('file'), handleFileUploadForNgo);

router.get("/vol/:id", handleGetOneVol);

router.get('/:id/volunteers', handleGetAllAssociatedVols);

router.post('/vol/add', handleAddNewVolunteer);

router.get("/details", handleGetNgoDetails);

router.get("/owner", handleGetUserDetails);

router.post("/register", handleRegisterNewNgo);

router.get("/register/status", handleGetRegisterStatus);

module.exports = router;