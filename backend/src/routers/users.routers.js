const express = require("express");
const router = express.Router();

/* CONTROLLERS */
const {
  patchEditProfilePic,
  patchEditUsername,
  patchEditUserBio,
} = require("../controllers/user.controllers");

/* VALIDATORS */
const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  userProfileValidationSchema,
} = require("../validators/user.validators");

const userProfileMiddleware = validateSchema(userProfileValidationSchema);

router.patch("/edit/:userId/pic", patchEditProfilePic);

router.use(userProfileMiddleware);
router.patch("/edit/:userId/username", patchEditUsername);
router.patch("/edit/:userId/bio", patchEditUserBio);

module.exports = router;
