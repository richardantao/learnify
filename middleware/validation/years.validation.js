const { check, sanitize, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    const { title, start, end } = req.body;

    check(title, "Title received an invalid input").isAlphanumeric().withMessage("The title can only include letters and numbers")
        .isLength({min: 3, max: undefined}).withMessage("The title must be at least 3 characters");
    check(start, "Start Date received an invalid input").isLength({min: 1}).withMessage("The start date is a required field");
    check(end, "End Date received an invalid input").isLength({min: 1}).withMessage("The end date is a required field");;

    sanitize(title).escape();
    sanitize(start).toDate().escape();
    sanitize(end).toDate().escape();

    if(start >= end) {
        return res.status(422).json({
            message: "The end date must occur before the start date"
        });
    };


    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.message
        });
    } else {
        next();
    };
};

module.exports = validate;