const { check, sanitize, validationResult } = require("express-validator");

const Course = require("../../models/Courses");

const validation = (req, res, next) => {
    const error = validationResult(req);
    const { course, title, type, start, end, location, weight, score } = req.body;

    check(course, "There was an error linking your assessment to a course")
        .exists().withMessage("There was an error linking your assessment to a course")
        .isMongoId().withMessage("There was an error linking your assessment to a course");
    
    check(title, "Title had an invalid input")
        .exists().withMessage("Assessment title is a required field")
        .isAlphanumeric().withMessage("");
    
    check(type, "Type had an invalid input")
        .exists().withMessage("Type is a required field")
        .isAlphanumeric().withMessage("Type can only contain letters and numbers");

    check(start, "Start date received an invalid date")
        .exists().withMessage("Start date is a required field");

    check(end, "End date had an invalid input")
        .optional()

    check(location, "Location had an invalid input")
        .optional()
        .isAlphanumeric().withMessage("Location can only contain letters and numbers");

    check(weight, "Weight had an invalid input")
        .optional()
        .isNumeric().withMessage("Weight must be a numerical value");

    check(score, "Score had an invalid input")
        .optional()
        .isNumeric().withMessage("Score must be a numerical value");

    sanitize(course).escape().toString();
    sanitize(title).escape().toString();
    sanitize(type).escape().toString();
    sanitize(start).escape().toDate();
    sanitize(end).escape().toDate();
    sanitize(location).escape().toString();
    sanitize(weight).escape().toFloat();
    sanitize(score).escape().toFloat();

    if(weight > 100 || weight < 0) {
        return res.status(422).json({
            message: "Weight must be a percentage between 0 and 100"
        });
    };
    
    if(score > 100 || score < 0) {
        return res.status(422).json({
            message: "Score must a percentage between 0 and 100 "
        });
    };

    if(!error.isEmpty()) {
        return res.status(422).json({
            message: error.message
        });
    } else {
        Course.find({ _id: course }, { 
            term: 1
        })
        .populate("term", [ "date" ])
        .limit(1)
        .then(termRange => {
            if(termRange[0].term.date.start > start || termRange[0].term.date.end < end) {
                return res.status(422).json({
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

module.exports = validation;