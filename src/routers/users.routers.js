const express = require("express");
const router = express.Router();

/* CONTROLLERS */
const { postSignup } = require("../controllers/user.controllers");

/* VALIDATORS */
const validateSchema = require("../middlewares/validate.middlewares");
const { userValidationSchema } = require("../validators/user.validator");
const userValidationMiddleware = validateSchema(userValidationSchema);

router.post("/signup", postSignup);

module.exports = router;
