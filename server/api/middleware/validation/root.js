const { check, sanitize, validationResult } = require("express-validator");

exports.invite = (req, res, next) => {
    const error = validationResult(req);
    const { name, email } = req.body;

    check(name, "Name had an invalid input")
    .exists().withMessage("Name is a required field")
    .isAlphanumeric().withMessage("Name must contain only letters and numbers");

    check(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");

    sanitize(name)
        .escape();
    sanitize(email)
        .escape()
        .normalizeEmail();
        
    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        return next();
    };
};

exports.contact = (req, res, next) => {    
    const error = validationResult(req);
    const { name, email, text } = req.body;

    check(name, "Name had an invalid input")
        .exists().withMessage("Name is a required field")
        .isLength().withMessage("Name must be at least 3 characters long")
        .isAlphanumeric().withMessage("Name must contain only numbers and letters");
    
    check(email, "Email received an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    
    check(text, "Message received an invalid message")
        .exists().withMessage("Message is a required field")
        .isLength({ min: 15 }).withMessage("Message must contain at least 15 characters");

    sanitize(name).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(text).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        return next();
    };
};