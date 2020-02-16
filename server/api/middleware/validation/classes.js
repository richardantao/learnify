const { body, validationResult } = require("express-validator");

const User = require("../../models/User");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    const { course, title, start, end, frequency, by, interval, location, description } = req.body;

    body(course, "An error occurred while linking your class to a course")
        .exists().withMessage("Your class wasn't linked to a course")
        .isMongoId().withMessage("An error occurred while linking your class to a course")
        .escape();

    body(title, "Title had an invalid input")
        .exists().withMessage()
        .escape();

    body(start, "Start Date had an invalid input")
        .exists().withMessage()
        .escape()
        .toDate();

    body(end, "End Date had an invalid input")
        .exists().withMessage()
        .escape()
        .toDate();

    body(frequency, "Frequency had an invalid input")
        .exists().withMessage()
        .escape();

    body(by, "By had an invalid input")
        .optional()
        .isNumeric().withMessage("By must be a numerical value")
        .escape();

    body(interval, "Interval had an invalid input")
        .optional()
        .isNumeric().withMessage("")
        .escape();

    body(location, "Location had an invalid input")
        .optional()
        .isAlpha().withMessage("")
        .escape();

    body(description, "Description had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Description can only contain letters and numbers")
        .escape();
        
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.msg
        });
    } else {
        return next();
    };
};