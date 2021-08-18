const correctName = /^\w+\s\w+$/i;
const { check, validationResult } = require("express-validator/check");

exports.checkUsers = [
  check("fullName")
    .notEmpty()
    .matches(correctName)
    .withMessage("Invalid Firstname and Lastname")
    .bail(),
  check("email").notEmpty().isEmail().withMessage("Invalid email").bail(),
  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Invalid password")
    .bail(),
  check("dob")
    .notEmpty()
    .isDate({ format: "YYYY/MM/DD" })
    .withMessage("Invalid date")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ errors: errors.array() });
    console.log(errors);
    next();
  },
];
