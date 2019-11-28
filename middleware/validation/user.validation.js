const { check, sanitize, validationResult } = require("express-validator");

// instantiate validation 
const validate = [];

validate.profile = (req, res, next) => {
    const errors = validationResult(req);
    const { first, last, email, country, region, institution, school } = req.body;
    
    check(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name can only contain letters and numbers");
    
    check(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name can only contain letters and numbers");
    
    check(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address");
    
    check(country, "Country had an invalid input")
        .optional()
        .isAlpha().withMessage("Country can only contain letters");
    
    check(region, "Region had an invalid input")
        .optional()
        .isAlpha().withMessage("Province/state can only contain letters");
    
    check(institution, "Institution had an invalid input")
        .optional()
        .isAlpha().withMessage("Institution can only contain letters");
    
    check(school, "School had an invalid input")
        .optional()
        .isAlpha().withMessage("School can only contain letters");

    sanitize(first).escape();
    sanitize(last).escape();
    sanitize(email).escape().normalizeEmail();
    sanitize(country).escape();
    sanitize(region).escape();
    sanitize(institution).escape();
    sanitize(school).escape();

    if(!errors.isEmpty()) {
        return res.status().json({
            message: errors.message
        });
    } else {
        next();
    };
};

validate.password = (req, res, next) => {
    const errors = validationResult(req);
    const { current, confirm } = req.body;

    if (req.body.new !== confirm) {
        return res.status(422).json({
            message: "The confirmation does not match your new password"
        });
    };

    check(current, "Current password is invalid")
    .exists().withMessage("Current password is a required field");
    
    check(req.body.new, "New password had an invalid input")
    .exists().withMessage("New password is a required field");
    
    check(confirm, "Confirm password had an invalid password")
    .exists().withMessage("Confirm password is a required field");

    sanitize(current).escape();
    sanitize(req.body.new).escape();
    sanitize(confirm).escape();

    if(!errors.isEmpty()) {
        return res.status().json({
            message: errors.message
        });
    } else {
        next();
    };
};

validate.preferences = (req, res, next) => {
    const errors = validationResult(req);
    const { startDay, startTime, defaultDuration, defaultCalendar } = req.body;

    check(startDay, "Start day had an invalid input")
    .exists().withMessage("Start day is a required field");
    
    check(startTime, "Start time had an invalid input")
    .exists().withMessage("Start time is a required field");
    
    check(defaultDuration, "Default duration had an invalid input")
    .exists().withMessage("Default class time is a required field");

    check(defaultCalendar, "Default calendar had an invalid input")
    .exists().withMessage("Default calendar view is a required field");

    sanitize(startDay).escape();
    sanitize(startTime).escape();
    sanitize(defaultDuration).escape();
    sanitize(defaultCalendar).escape();

    if(!errors.isEmpty()) {
        return res.status().json({
            message: errors.message
        });
    } else {
        next();
    };
};

validate.integration = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status().json({
            message: errors.message
        });
    } else {
        next();
    };
};

module.exports = validate;