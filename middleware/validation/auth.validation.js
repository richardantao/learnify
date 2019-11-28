const { check, sanitize, validationResult } = require("express-validator"); 

// instantiate validation 
const validate = [];

validate.user = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(401).json({
            message: "Validation failed, please try again",
            errors
        });
    } else {
        res.status(200).json({
            message: "Validation successful",
            errors: null
        });
        next();
    };
};

validate.application = (req, res, next) => {
    const errors = validationResult(req);

    check("");
    
    sanitize("");

    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed. Please try again",
            errors
        });
    } else {
        res.status(200).json({
            message: "Validation successful",
            errors: null
        })
        next();
    };
};

validate.contact = (req, res, next) => {
    const errors = validationResult(req);
    const { name, email, message } = req.body;

    check(name, "Name had an invalid input")
    .exists().withMessage("Name is a required field")
    .isAlphaNumeric().withMessage("Name can only contain letters and words");
    
    check(email, "Email had an invalid input")
    .exists().withMessage("Email is a required field")
    .isEmail().withMessage("Email must be a valid email address");;
    
    check(message, "Message received an invalid input")
    .exists().withMessage("Message is a required field");

    sanitize(name).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(message).escape();

    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.message
        });
    } else {
        next();
    };
};

validate.invite = (req, res, next) => {
    const errors = validationResult(req);
    const { name, email } = req.body;

    check(name, "Name had an invalid input")
    .exists().withMessage("Name is a required field")
    .isAlphaNumeric().withMessage("Name can only contain letters and words");
    
    check(email, "Email had an invalid input")
    .exists().withMessage("Email is a required field")
    .isEmail().withMessage("Email must be a valid email address");;

    sanitize(name).escape();
    sanitize(email).escape().normalizeEmail();

    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.message
        });
    } else {
        next();
    };
};

validate.register = (req, res, next) => {
    const errors = validationResult(req);
    const { first, last, email, password } = req.body;

    check(first, "First name has an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name can only contain letters and numbers");
    check(last, "Last name has an invalud input")
        .exists("Last name is a required field")
        .isAlphanumeric().withMessage("Last name can only contain letters and numbers");
    check(email, "Email has an invalud input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    check(password, "Password has an invalud input")
        .isLength({min: 6}).withMessage("Your password must be at least 6 characters");

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(password).escape();


    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.message
        });
    } else {
        next();
    };
};

validate.signin = (req, res, next) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    check(email, "Email has an invalud input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    check(password, "Password has an invalud input")
        .isLength({min: 6}).withMessage("Your password must be at least 6 characters");

    sanitize(email).escape().normalizeEmail();
    sanitize(password).escape();

    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.message
        });
    } else {
        next();
    };
};

validate.signout = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed. Please try again",
            errors
        });
    } else {
        res.status(200).json({
            message: "Validation successful",
            errors: null
        })
        next();
    };
};

module.exports = validate;