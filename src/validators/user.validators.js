const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userSignupValidationSchema = Joi.object().keys({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_.]+$/)
    .required()
    .min(3)
    .max(25),
  email: Joi.string().email().required().max(35),
  password: JoiPassword.string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
});

const userLoginValidationSchema = Joi.object()
  .keys({
    username: Joi.string()
      .regex(/^[a-zA-Z0-9_.]+$/)
      .min(3)
      .max(25),
    email: Joi.string().email().max(35),
    password: JoiPassword.string()
      .min(8)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  })
  .or("username", "email");

module.exports = { userSignupValidationSchema, userLoginValidationSchema };
