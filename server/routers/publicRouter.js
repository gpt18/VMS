const express = require("express");
const router = express.Router();
const { handleFileView } = require("../controllers/uploads.controller");

router.get("/file/:file", handleFileView);

module.exports = router;