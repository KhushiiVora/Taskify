const Joi = require("joi");

const workspaceValidationSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-Z0-9_.\s]+$/)
    .required()
    .min(4),
  code: Joi.string()
    .regex(/^[a-zA-Z0-9_.]+$/)
    .required()
    .min(6),
});

module.exports = { workspaceValidationSchema };
