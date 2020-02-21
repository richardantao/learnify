const { body, validationResult } = require("express-validator"); 

exports.register = (req, res, next) => {
    const errors = validationResult(req);
    const { first, last, email, password } = req.body;

    body(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isLength({ min: 2, max: 128 }).withMessage("First name must be inbetween 2 and 128 characters")
        .isAlphanumeric().withMessage("First name can only contain letters and numbers")
        .escape();

    body(last, "Last name had an invalid input")
        .exists("Last name is a required field")
        .isLength({ min: 2, max: 128 }).withMessage("Last name must be inbetween 2 and 128 characters")
        .isAlphanumeric().withMessage("Last name can only contain letters and numbers")
        .escape();

    body(email, "Email has an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .escape()
        .normalizeEmail();

    body(password, "Password has an invalid input")
        .isLength({ min: 8, max: 128 }).withMessage("Your password must be at least 8 characters")
        .escape();

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else {
        return next();
    };
};

exports.signin = (req, res, next) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    body(email, "Email has an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .escape()
        .normalizeEmail();

    body(password, "Password has an invalid input")
        .isLength({ min: 8 }).withMessage("Your password must be at least 8 characters")
        .escape();

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.message });
    } else {
        return next();
    };
};

exports.signout = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed. Please try again" });
    } else {
        return next();
    };
};