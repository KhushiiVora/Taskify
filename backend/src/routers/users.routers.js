const express = require("express");
const router = express.Router();

/* CONTROLLERS */
const {
  postEditProfilePic,
  patchEditUsername,
  patchEditUserBio,
} = require("../controllers/user.controllers");

/* VALIDATORS */
const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  userProfileValidationSchema,
} = require("../validators/user.validators");

const userProfileMiddleware = validateSchema(userProfileValidationSchema);

router.post("/edit/:username/pic", postEditProfilePic);

router.use(userProfileMiddleware);
router.patch("/edit/:userId/username", patchEditUsername);
router.patch("/edit/:userId/bio", patchEditUserBio);

module.exports = router;
