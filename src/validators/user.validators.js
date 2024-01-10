const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userSignupValidationSchema = Joi.object().keys({
  username: Joi.string().alphanum().required().max(25).min(3),
  email: Joi.string().email().required().max(35),
  password: JoiPassword.string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .required(),
});

module.exports = { userSignupValidationSchema };
