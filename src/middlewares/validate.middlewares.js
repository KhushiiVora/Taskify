const validateSchema = (schema) => {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) res.status(422).json(error);
    else next();
  };
};

module.exports = { validateSchema };
// apply this middleware in signup router
