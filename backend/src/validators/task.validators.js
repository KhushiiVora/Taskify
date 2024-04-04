const Joi = require("joi");

const taskCategoryValidationSchema = Joi.object().keys({
  categoryName: Joi.string()
    .regex(/^[a-zA-Z0-9_.\s]+$/)
    .required(),
});

const taskValidationSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-Z0-9_.\s]+$/)
    .required(),
  assignedTo: Joi.array().required(),
  dueDate: Joi.string().required(),
});
module.exports = { taskCategoryValidationSchema, taskValidationSchema };
