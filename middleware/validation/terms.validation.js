const { check, sanitize, validationResult } = require("express-validator"); 

// import model to validate against Years array
const User = require("../../models/User.model");

const validate =  (req, res, next) => {
    const errors = validationResult(req);
    const { Id, title, start, end } = req.body;

    check(title, "Title had an invalid input")
        .exists().withMessage("Title is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers");
    
    check(start, "Start date had an invalid input")
        .exists().withMessage("Start date is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers");
    
    check(end, "End date had an invalid input")
        .exists().withMessage("End date is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers");
    
    sanitize(title).escape();
    sanitize(start).escape().toDate();
    sanitize(end).escape().toDate();

    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.message
        });
    } else {
        // check if terms dates are within the years date
        User.find({ "year._id": Id }, {
            "year.date": 1
        })
        .then(yearRange => {
            // if the term start date is earlier that the year start date OR term end date is after the year end date 
            /* VERIFY object grabbed for the promise */
            if(yearRange.start > start || yearRange.end < end) {
                return res.status(422).json({
                    message: "The start and end date must be inside the dates of the year you have selected"
                });
            } else {
                // call controller function if no errors
                next();
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message || "An error occurred on the server while validating your request"
            });
        });
    };    
};

module.exports = validate;