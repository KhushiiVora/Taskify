const Joi = require("joi");

const taskCategoryValidationSchema = Joi.object().keys({
  categoryName: Joi.string()
    .regex(/^[a-zA-Z0-9_.\s]+$/)
    .required()
    .min(4),
});

module.exports = { taskCategoryValidationSchema };
