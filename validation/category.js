const { check, validationResult } = require("express-validator");

exports.checkCategory = [
  check("category")
    .notEmpty()
    .withMessage("Category must be not empty")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
