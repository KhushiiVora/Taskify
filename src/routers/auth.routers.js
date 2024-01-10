const express = require("express");
const router = express.Router();

/* CONTROLLERS */
const { postSignup } = require("../controllers/auth.controllers");

/* VALIDATORS */
const { validateSchema } = require("../middlewares/validate.middlewares");

const { userSignupValidationSchema } = require("../validators/user.validators");

const userSignupMiddleware = validateSchema(userSignupValidationSchema);

router.post("/signup", userSignupMiddleware, postSignup);

module.exports = router;
