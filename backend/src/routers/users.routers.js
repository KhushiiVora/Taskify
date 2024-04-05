const express = require("express");
const router = express.Router();

const { postEditProfilePic } = require("../controllers/user.controllers");

router.post("/edit/:username/pic", postEditProfilePic);

module.exports = router;
