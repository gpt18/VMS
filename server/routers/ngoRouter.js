const express = require("express");
const { handleGetNgoDetails, handleRegisterNewNgo, handleGetRegisterStatus } = require("../controllers/ngo.controller");
const { handleGetUserDetails } = require("../controllers/user.controller");

const router = express.Router();

router.get("/details", handleGetNgoDetails);

router.get("/owner", handleGetUserDetails);

router.post("/register", handleRegisterNewNgo);

router.get("/register/status", handleGetRegisterStatus);

module.exports = router;