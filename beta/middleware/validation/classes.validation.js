const { check, sanitize, validationResult } = require("express-validator");

const User = require("../../models/User.model");


/* Yet to finish */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    const { Id, Title, title, start, end, frequency, by, interval, location, description } = req.body;

    check(Id, "");

    check(Title, "Course Title had an invalid input")
        .exists().withMessage("")
        .isAlphanumeric().withMessage("");

    check(title, "Class Title had an invalid input")
        .exists().withMessage();

    check(start, "Class Start Date had an invalid input")
        .exists().withMessage();

    check(end, "Class End Date had an invalid input")
        .exists().withMessage();

    check(frequency, "Class Frequency had an invalid input")
        .exists().withMessage();

    check(by, "Class __ had an invalid input")
        .optional()
        .isNumeric().withMessage("Class __ must be a numerical value");

    check(interval, "Class Interval had an invalid input")
        .optional()
        .isNumeric().withMessage(""); 

    check(location, "Class Location had an invalid input")
        .optional()
        .isAlpha().withMessage(""); 

    check(description, "Class Description had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Class Description can only contain letters and numbers"); 

    sanitize(Title).escape();
    sanitize(title).escape();
    sanitize(start).escape().toDate();
    sanitize(end).escape().toDate();
    sanitize(frequency).escape();
    sanitize(by).escape();
    sanitize(interval).escape();
    sanitize(location).escape();
    sanitize(description).escape();

    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.message
        });
    } else {
        next();
    };
};

module.exports = validate;