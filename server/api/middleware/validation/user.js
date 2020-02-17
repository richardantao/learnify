const { body, validationResult } = require("express-validator");

exports.profile = (req, res, next) => {
    const errors = validationResult(req);
    const { first, last, email, country, region, institution, school } = req.body;
    
    body(first, "First name had an invalid input")
        .exists().withMessage("First name is a required field")
        .isAlphanumeric().withMessage("First name can only contain letters and numbers")
        .escape();
    
    body(last, "Last name had an invalid input")
        .exists().withMessage("Last name is a required field")
        .isAlphanumeric().withMessage("Last name can only contain letters and numbers")
        .escape();
    
    body(email, "Email had an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .escape()
        .normalizeEmail();
    
    body(country, "Country had an invalid input")
        .optional()
        .isAlpha().withMessage("Country can only contain letters")
        .escape();
    
    body(region, "Region had an invalid input")
        .optional()
        .isAlpha().withMessage("Province/state can only contain letters")
        .escape();
    
    body(institution, "Institution had an invalid input")
        .optional()
        .isAlpha().withMessage("Institution can only contain letters")
        .escape();
    
    body(school, "School had an invalid input")
        .optional()
        .isAlpha().withMessage("School can only contain letters")
        .escape();

    if(!errors.isEmpty()) {
        return res.status().json({ message: errors.msg });
    } else {
        return next();
    };
};

exports.password = (req, res, next) => {
    const errors = validationResult(req);
    const { current, change, confirm } = req.body;

    if (change !== confirm) {
        return res.status(400).json({ message: "The confirmation does not match your new password" });
    };

    body(current, "Current password is invalid")
        .exists().withMessage("Current password is a required field")
        .isLength({ min: 8, max: 128 }).withMessage("Your password must be between 8 and 128 characters")
        .escape();
    
    body(change, "New password had an invalid input")
        .exists().withMessage("New password is a required field")
        .escape();
    
    body(confirm, "Confirm password had an invalid password")
        .exists().withMessage("Confirm password is a required field")
        .escape();

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else {
        return next();
    };
};

exports.preferences = (req, res, next) => {
    const errors = validationResult(req);
    const { startDay, startTime, defaultDuration, defaultCalendar } = req.body;

    body(startDay, "Start day had an invalid input")
        .exists().withMessage("Start day is a required field")
        .escape();
    
    body(startTime, "Start time had an invalid input")
        .exists().withMessage("Start time is a required field")
        .escape();
    
    body(defaultDuration, "Default duration had an invalid input")
        .exists().withMessage("Default class time is a required field")
        .escape();

    body(defaultCalendar, "Default calendar had an invalid input")
        .exists().withMessage("Default calendar view is a required field")
        .escape();

    if(!errors.isEmpty()) {
        return res.status(400).json({ message: errors.msg });
    } else {
        return next();
    };
};