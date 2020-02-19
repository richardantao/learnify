const { body, validationResult } = require("express-validator");
const moment = require("moment");

const Course = require("../../models/Courses");

module.exports = (req, res, next) => {
    const error = validationResult(req);
    const { course, title, type, start, end, location, weight, score } = req.body;

    body(course, "There was an error linking your assessment to a course")
        .exists().withMessage("There was an error linking your assessment to a course")
        .isMongoId().withMessage("There was an error linking your assessment to a course")
    
    body(title, "Title had an invalid input")
        .exists().withMessage("Assessment title is a required field")
        .isAlphanumeric().withMessage("Title can only contain letters and numbers")
        .escape()
        .toString();
    
    body(type, "Type field had an invalid input")
        .exists().withMessage("Type is a required field")
        .isAlphanumeric().withMessage("Type can only contain letters and numbers")
        .escape()
        .toString();

    body(start, "Start date field received an invalid date")
        .exists().withMessage("Start date is a required field")
        .escape()
        .toDate()

    body(end, "End date field had an invalid input")
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

    if(end && moment(start, "YYYY-MM-DD") > moment(end, "YYYY-MM-DD")) {
        return res.status(400).json({ message: "Start date must come before end date" })
    };

    if(weight > 100 || weight < 0) {
        return res.status(400).json({ message: "Weight must be a percentage between 0 and 100" });
    };
    
    if(score > 100 || score < 0) {
        return res.status(400).json({ message: "Score must a percentage between 0 and 100" });
    };

    if(!error.isEmpty()) {
        return res.status(400).json({ message: error.msg });
    } else {
        Course.find({ _id: course }, { 
            term: 1,
            _id: 0
        })
        .populate("term", [ "date" ])
        .limit(1)
        .then(termRange => {
            if(end === undefined || end === null || end === "") {
                if(moment(termRange[0].term[0].date.start, "YYYY-MM-DD") > moment(start, "YYYY-MM-DD") || moment(termRange[0].term[0].date.end, "YYYY-MM-DD") < moment(start, "YYYY-MM-DD")) {
                    return res.status(400).json({
                        message: "The assessment date must be inbetween the date of the term your course belongs to"
                    });
                } else {
                    return next();
                };
            } else {
                if(moment(termRange[0].term[0].date.start, "YYYY-MM-DD") > moment(start, "YYYY-MM-DD") || moment(termRange[0].term[0].date.end, "YYYY-MM-DD") < moment(end, "YYYY-MM-DD")) {
                    return res.status(400).json({
                        message: "The assessment date must be inbetween the date of the term your course belongs to"
                    });
                } else {
                    return next();
                };
            };
        })
        .catch(err => {
            return res.status(500).json({ message: err.message });
        });
    };
};