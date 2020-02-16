const { body, validationResult } = require("express-validator");

exports.tech = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;

    body(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name field can only contain letters and numbers");

    body(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name field can only contain letters and numbers")
        .escape();
    
    body(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .escape()
        .normalizeEmail();
    
    body(city, "City had an invalid input")
        .exists().withMessage("City is a required field")
        .isAlpha().withMessage("City field can only contain letters")
        .escape();

    body(strategy, "First 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")
        .escape();

    body(help, "Second 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")
        .escape();

    body(importance, "Third 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")
        .escape();

    body(resume, "Resume had an invalid input")
        .exists().withMessage("You must include a link to your resume with your application")
        .escape();

    body(portfolio, "Github had an invalid input")
        .exists().withMessage("Github is a required field")
        .escape();

    body(linkedin, "LinkedIn had an invalid input")
        .exists().withMessage("LinkedIn is a required field")
        .escape();

    body(other, "Other had an invalid input")
        .optional()
        .escape();

    if(!error.isEmpty()) {
        return res.status(400).json({
            message: error.msg
        });
    } else {
        return next();
    };
};

exports.nontech = (req, res, next) => {
    const error = validationResult(req);
    const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = req.body;

    body(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name field can only contain letters and numbers")
        .escape();

    body(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name field can only contain letters and numbers")
        .escape();
    
    body(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .escape()
        .normalizeEmail();

    body(city, "City had an invalid input")
        .exists().withMessage("City is a required field")
        .isAlpha().withMessage("City field can only contain letters")
        .escape();
    
        body(strategy, "First 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")
        .escape();

    body(help, "Second 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")
        .escape();

    body(importance, "Third 'Tell Us About Yourself' answer had an invalid input")
        .exists().withMessage("The 'Tell Us About Yourself' questions are required fields")
        .escape();

    body(resume, "Resume had an invalid input")
        .exists().withMessage("You must attach a link to your resume with your application")
        .escape();

    body(portfolio, "Portfolio had an invalid input")
        .optional()
        .escape();

    body(linkedin, "LinkedIn had an invalid input")
        .optional()
        .escape();

    body(other, "Other had an invalid input")
        .optional()
        .escape();

    if(!error.isEmpty()) {
        return res.status(400).json({
            message: error.msg
        });
    } else {
        return next();
    };
};