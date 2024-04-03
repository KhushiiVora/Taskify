const ErrorService = require("../services/errorService");
const errorService = new ErrorService();

const validateSchema = (schema) => {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      const joiError = errorService.handleJoiError(error);
      console.log(joiError);
      res.status(joiError.status).json(joiError.message);
    } else next();
  };
};

module.exports = { validateSchema };
// apply this middleware in signup router
