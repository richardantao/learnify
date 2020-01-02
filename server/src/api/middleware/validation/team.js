const { check, sanitize, validationResult } = require("express-validator");

const validation = [];

validation.backend = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city } = req.body;

    check(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name field can only contain letters and numbers");

    check(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name field can only contain letters and numbers");
    
    check(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    
    check(city, "City had an invalid input")
        .exists().withMessage("City is a required field")
        .isAlpha().withMessage("City field can only contain letters");

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(city).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        next();
    };
};

validation.creator = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city } = req.body;

    check(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name field can only contain letters and numbers");

    check(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name field can only contain letters and numbers");
    
    check(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    
    check(city, "City had an invalid input")
        .exists().withMessage("City is a required field")
        .isAlpha().withMessage("City field can only contain letters");

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(city).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        next();
    };
};

validation.designer = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city } = req.body;

    check(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name field can only contain letters and numbers");

    check(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name field can only contain letters and numbers");
    
    check(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    
    check(city, "City had an invalid input")
        .exists().withMessage("City is a required field")
        .isAlpha().withMessage("City field can only contain letters");

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(city).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        next();
    };
};

validation.frontend = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city } = req.body;

    check(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name field can only contain letters and numbers");

    check(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name field can only contain letters and numbers");
    
    check(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    
    check(city, "City had an invalid input")
        .exists().withMessage("City is a required field")
        .isAlpha().withMessage("City field can only contain letters");

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(city).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        next();
    };
};

validation.marketer = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city } = req.body;

    check(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name field can only contain letters and numbers");

    check(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name field can only contain letters and numbers");
    
    check(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    
    check(city, "City had an invalid input")
        .exists().withMessage("City is a required field")
        .isAlpha().withMessage("City field can only contain letters");

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(city).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        next();
    };
};

module.exports = validation;