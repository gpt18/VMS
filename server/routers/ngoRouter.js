const express = require("express");
const { handleGetNgoDetails } = require("../controllers/ngo.controller")

const router = express.Router();

router.get("/:id", handleGetNgoDetails);

module.exports = router;