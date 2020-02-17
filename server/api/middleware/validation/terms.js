const { body, validationResult } = require("express-validator"); 
const moment = require("moment");

const Year = require("../../models/Years");

module.exports =  (req, res, next) => {
    const errors = validationResult(req);
    const { year, title, start, end } = req.body;

    body(title, "Title had an invalid input")
        .exists().withMessage("Title is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape();
    
    body(start, "Start date had an invalid input")
        .exists().withMessage("Start date is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape()
        .toDate();
    
    body(end, "End date had an invalid input")
        .exists().withMessage("End date is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape()
        .toDate();

    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.msg
        });
    } else {
        // body if terms dates are within the years date
        Year.find({ _id: year }, {
            _id: 0,
            date: 1
        })
        .limit(1)
        .then(yearRange => {
            if(moment(yearRange[0].date.start, "YYYY-MM-DD") > moment(start, "YYYY-MM-DD") || moment(yearRange[0].date.end, "YYYY-MM-DD") < moment(end, "YYYY-MM-DD")) {
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