const { body, validationResult } = require("express-validator"); 

const Term = require("../../models/Terms");

module.exports =  (req, res, next) => {
    const errors = validationResult(req);
    const { year, title, start, end } = req.body;

    check(title, "Title had an invalid input")
        .exists().withMessage("Title is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape();
    
    check(start, "Start date had an invalid input")
        .exists().withMessage("Start date is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape()
        .toDate();
    
    check(end, "End date had an invalid input")
        .exists().withMessage("End date is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape()
        .toDate();

    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.msg
        });
    } else {
        // check if terms dates are within the years date
        Term.find({ year }, {
            date: 1
        })
        .limit(1)
        .then(yearRange => {
            // if the term start date is earlier that the year start date OR term end date is after the year end date 
            if(yearRange[0].start > start || yearRange[0].end < end) {
                return res.status(400).json({
                    message: "The start and end date must be inside the dates of the year you have selected"
                });
            } else {
                return next();
            };
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message
            });
        });
    };    
};