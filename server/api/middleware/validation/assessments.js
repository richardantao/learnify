const { body, validationResult } = require("express-validator");
const moment = require("moment");

const Course = require("../../models/Courses");

module.exports = (req, res, next) => {
    const error = validationResult(req);
    const { course, title, type, start, end, location, weight, score } = req.body;

    body(course, "There was an error linking your assessment to a course")
        .exists().withMessage("There was an error linking your assessment to a course")
        .isMongoId().withMessage("There was an error linking your assessment to a course")
        .escape()
        .toString();
    
    body(title, "Title had an invalid input")
        .exists().withMessage("Assessment title is a required field")
        .isAlphanumeric().withMessage("")
        .escape()
        .toString();
    
    body(type, "Type had an invalid input")
        .exists().withMessage("Type is a required field")
        .isAlphanumeric().withMessage("Type can only contain letters and numbers")
        .escape()
        .toString();

    body(start, "Start date received an invalid date")
        .exists().withMessage("Start date is a required field")
        .escape()
        .toDate()

    body(end, "End date had an invalid input")
        .optional()
        .escape()
        .toDate();

    body(location, "Location had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Location can only contain letters and numbers")
        .escape()
        .toString();

    body(weight, "Weight had an invalid input")
        .optional()
        .isNumeric().withMessage("Weight must be a numerical value")
        .escape()
        .toFloat();

    body(score, "Score had an invalid input")
        .optional()
        .isNumeric().withMessage("Score must be a numerical value")
        .escape()
        .toFloat();

    if(weight > 100 || weight < 0) {
        return res.status(400).json({
            message: "Weight must be a percentage between 0 and 100"
        });
    };
    
    if(score > 100 || score < 0) {
        return res.status(400).json({
            message: "Score must a percentage between 0 and 100 "
        });
    };

    if(!error.isEmpty()) {
        return res.status(400).json({
            message: error.msg
        });
    } else {
        Course.find({ _id: course }, { 
            term: 1
        })
        .populate("term", [ "date" ])
        .limit(1)
        .then(termRange => {
            if(moment(termRange[0].term.date.start, "YYYY-MM-DD") > moment(start, "YYYY-MM-DD") || moment(termRange[0].term.date.end, "YYYY-MM-DD") < moment(end, "YYYY-MM-DD")) {
                return res.status(400).json({
                    message: "The assessment date must be inside the date of the term your course is in"
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