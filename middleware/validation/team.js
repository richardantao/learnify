const { check, sanitize, validationResult } = require("express-validator");

exports.tech = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;

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

    check(strategy, "First 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")

    check(help, "Second 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")

    check(importance, "Third 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")

    check(resume, "Resume had an invalid input")
        .exists().withMessage("You must include a link to your resume with your application")

    check(portfolio, "Github had an invalid input")
        .exists().withMessage("Github is a required field");

    check(linkedin, "LinkedIn had an invalid input")
        .exists().withMessage("LinkedIn is a required field");

    check(other, "Other had an invalid input")
        .optional();

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(city).escape();
    sanitize(strategy).escape();
    sanitize(help).escape();
    sanitize(importance).escape();
    sanitize(portfolio).escape();
    sanitize(linkedin).escape();
    sanitize(other).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        return next();
    };
};

exports.nontech = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;

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
    
        check(strategy, "First 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")

    check(help, "Second 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")

    check(importance, "Third 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")

    check(resume, "Resume had an invalid input")
        .exists().withMessage("You must attach a link to your resume with your application")

    check(portfolio, "Portfolio had an invalid input")
        .optional();

    check(linkedin, "LinkedIn had an invalid input")
        optional();

    check(other, "Other had an invalid input")
        .optional();

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(city).escape();
    sanitize(strategy).escape();
    sanitize(help).escape();
    sanitize(importance).escape();
    sanitize(portfolio).escape();
    sanitize(linkedin).escape();
    sanitize(other).escape();

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        return next();
    };
};