const { check, validationResult } = require("express-validator");

exports.checkRating = [
  check("value")
    .notEmpty()
    .isInt({ min: 0, max: 5 })
    .withMessage("Invalid rating")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
