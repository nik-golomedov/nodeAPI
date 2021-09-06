const { check, validationResult } = require("express-validator");

exports.checkBooks = [
  check("title")
    .notEmpty()
    .withMessage("Title must be not empty")
    .bail(),
  check("description").notEmpty().withMessage("Description must be not empty").bail(),
  check("price")
    .notEmpty()
    .withMessage("Price must be not empty")
    .bail(),
    check("author")
    .notEmpty()
    .withMessage("Author must be not empty")
    .bail(),
    check("category")
    .notEmpty()
    .withMessage("category must be not empty")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
