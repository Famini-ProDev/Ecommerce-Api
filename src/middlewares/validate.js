// module.exports = (schema) => (req, res, next) => {
//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });
//   next();
// };
module.exports = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.errors,
    });
  }
};
